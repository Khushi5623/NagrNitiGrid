import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  MapPin,
  Send,
  CheckCircle,
  Brain,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client"; // ✅ ADDED

const categories = [
  "Infrastructure",
  "Water",
  "Sanitation",
  "Utilities",
  "General",
];

const areas = [
  "Sector 7",
  "Ward 12",
  "Central District",
  "Industrial Zone",
  "Green Belt",
  "Riverside",
  "Tech Park",
];

interface AIResult {
  category: string;
  severity: string;
  department: string;
  priorityScore: number;
  confidence: number;
}

const ReportPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [userLocation, setUserLocation] =
    useState<{ lat: number; lng: number } | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // ===============================
  // AI AUTO ANALYZE (UNCHANGED)
  // ===============================
  useEffect(() => {
    if (!title || !description) {
      setAiResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoadingAI(true);

        const response = await fetch("http://localhost:5000/analyze-issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });

        if (!response.ok) return;

        const data = await response.json();
        setAiResult(data);

        if (!category) {
          setCategory(data.category);
        }
      } catch (error) {
        console.error("AI Error:", error);
      } finally {
        setLoadingAI(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [title, description]);

  // ===============================
  // IMAGE PREVIEW (UNCHANGED)
  // ===============================
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // ===============================
  // LOCATION (UNCHANGED)
  // ===============================
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by this browser.");
      return;
    }

    if (
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost"
    ) {
      alert("Location works only on HTTPS or localhost.");
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setDetectingLocation(false);
      },
      (error) => {
        console.error(error);
        alert("Please allow location access.");
        setDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ===============================
  // SUBMIT FORM (ONLY user_id added)
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !area) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      // ✅ GET LOGGED-IN USER
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("area", area);

      formData.append("user_id", user.id); // ✅ ONLY NEW LINE

      if (image) {
        formData.append("image", image);
      }

      if (userLocation) {
        formData.append("latitude", String(userLocation.lat));
        formData.append("longitude", String(userLocation.lng));
      }

      const response = await fetch("http://localhost:5000/complaints", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Submission failed.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      // Reset
      setTitle("");
      setDescription("");
      setCategory("");
      setArea("");
      setImage(null);
      setUserLocation(null);
      setAiResult(null);
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Report</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Report a Civic Issue
          </h1>
        </motion.div>

        {submitted && (
          <div className="glass-card p-4 flex items-center gap-3 border-green-500/30">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              Issue reported successfully!
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">

          <input
            type="text"
            placeholder="Issue Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-dark"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="input-dark resize-none"
          />

          {loadingAI && (
            <div className="text-cyan-400 text-sm">
              🧠 Analyzing issue...
            </div>
          )}

          {aiResult && (
            <div className="p-5 rounded-xl border border-cyan-500/30 bg-blue-900/20 text-sm">
              <div className="flex items-center gap-2 mb-3 text-cyan-400 font-semibold">
                <Brain className="w-4 h-4" />
                AI Smart Analysis
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>Category: {aiResult.category}</div>
                <div>Severity: {aiResult.severity}</div>
                <div>Department: {aiResult.department}</div>
                <div>Priority: {aiResult.priorityScore}/10</div>
              </div>
            </div>
          )}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-dark"
            required
          >
            <option value="">Select category *</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="input-dark"
            required
          >
            <option value="">Select area *</option>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
            className="block w-full text-sm"
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="mt-2 w-40 rounded-lg border"
            />
          )}

          <button
            type="button"
            onClick={handleDetectLocation}
            className="glass-card p-4 flex items-center gap-3 bg-muted/30 hover:border-cyan-400 transition"
          >
            <MapPin className="w-5 h-5 text-primary" />
            Detect Location
          </button>

          {userLocation && (
            <div className="glass-card p-4 border border-cyan-400/40">
              Latitude: {userLocation.lat.toFixed(6)}
              <br />
              Longitude: {userLocation.lng.toFixed(6)}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-neon w-full flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {loading ? "Submitting..." : "Submit Report"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ReportPage;
