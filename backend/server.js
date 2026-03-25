const axios = require("axios");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// ===============================
// APP SETUP
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// ENV VARIABLES
// ===============================
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  PORT,
  GROQ_API_KEY,
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing Supabase credentials");
  process.exit(1);
}

// ===============================
// SUPABASE CLIENT
// ===============================
const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

// ===============================
// MULTER
// ===============================
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ===============================
// AI TEXT ANALYSIS
// ===============================
async function analyzeTextWithGroq(text) {
  try {
    if (!GROQ_API_KEY) throw new Error("No GROQ key");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Return ONLY valid JSON:
{
  "category": "Infrastructure | Water | Sanitation | Utilities | General",
  "severity": "Low | Medium | High | Critical",
  "sentiment": "Positive | Neutral | Negative",
  "priorityScore": number
}`,
          },
          { role: "user", content: text },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const raw = response.data.choices?.[0]?.message?.content || "";
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    const cleanJson = raw.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("⚠ Groq Error:", error.message);
    return {
      category: "General",
      severity: "Low",
      sentiment: "Neutral",
      priorityScore: 3,
    };
  }
}

async function analyzeComplaint(title, description) {
  const text = `${title}. ${description}`;
  const nlpResult = await analyzeTextWithGroq(text);

  return {
    category: nlpResult.category || "General",
    severity: nlpResult.severity || "Low",
    department: "General Department",
    priorityScore: nlpResult.priorityScore || 3,
    sentiment: nlpResult.sentiment || "Neutral",
  };
}

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
  res.send("✅ Backend running");
});

// ===============================
app.post("/analyze-issue", async (req, res) => {
  try {
    const { title = "", description = "" } = req.body;
    const result = await analyzeComplaint(title, description);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "AI analysis failed" });
  }
});

// ===============================
app.get("/complaints", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// ===============================
app.get("/complaints/user", async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "User ID required" });
    }

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Failed to fetch user complaints" });
  }
});

// ===============================
// CREATE COMPLAINT + SMART TRUST UPDATE
// ===============================
app.post("/complaints", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      category: userCategory,
      area,
      latitude,
      longitude,
      user_id,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Title and description required",
      });
    }

    if (!user_id) {
      return res.status(400).json({
        error: "User ID missing",
      });
    }

    const latValue = latitude ? parseFloat(latitude) : null;
    const lngValue = longitude ? parseFloat(longitude) : null;

    const aiResult = await analyzeComplaint(title, description);
    const finalCategory = userCategory || aiResult.category;

    let imageUrl = null;

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from("complaint-images")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("complaint-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("complaints")
      .insert([
        {
          title,
          description,
          area: area || null,
          category: finalCategory,
          severity: aiResult.severity,
          department: aiResult.department,
          priority_score: aiResult.priorityScore,
          sentiment: aiResult.sentiment,
          latitude: latValue,
          longitude: lngValue,
          status: "Pending",
          image_url: imageUrl,
          user_id: user_id,
        },
      ])
      .select();

    if (error) throw error;

    // ===============================
    // 🔥 SMART TRUST CALCULATION
    // ===============================
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (!profileError && profile) {
      let trustIncrease = 1;

      switch (aiResult.severity) {
        case "Critical":
          trustIncrease += 5;
          break;
        case "High":
          trustIncrease += 4;
          break;
        case "Medium":
          trustIncrease += 3;
          break;
        case "Low":
          trustIncrease += 1;
          break;
      }

      if (aiResult.sentiment === "Negative") {
        trustIncrease += 1;
      }

      const updatedTrust = Math.min(
        profile.trust_score + trustIncrease,
        100
      );

      await supabase
        .from("profiles")
        .update({
          total_reports: profile.total_reports + 1,
          valid_reports: profile.valid_reports + 1,
          trust_score: updatedTrust,
        })
        .eq("id", user_id);
    }

    res.status(201).json({
      message: "Complaint saved successfully ✅",
      data,
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({
      error: "Failed to save complaint",
      details: err.message,
    });
  }
});

// ===============================
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server running on http://localhost:${serverPort}`);
});
