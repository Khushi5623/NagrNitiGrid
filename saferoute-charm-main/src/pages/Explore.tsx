import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Compass } from "lucide-react";
import IssueCard from "@/components/IssueCard";
import { supabase } from "@/integrations/supabase/client";

interface Issue {
  id: string;
  title: string;
  area: string;
  category: string;
  status: string;
  created_at: string;
  severity?: string;
  department?: string;
  priority_score?: number;
  sentiment?: "Positive" | "Neutral" | "Negative"; // ✅ ADDED
}

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Infrastructure",
    "Water",
    "Sanitation",
    "Utilities",
    "General",
  ];

  // ===============================
  // FETCH ALL ISSUES (NOT USER SPECIFIC)
  // ===============================
  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/complaints"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        setLoading(false);
        return;
      }

      setIssues(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FILTER LOGIC
  // ===============================
  const filtered = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.area?.toLowerCase().includes(search.toLowerCase());

    const matchesCat =
      filterCategory === "All" || issue.category === filterCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 space-y-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Explore
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            All Reported Issues
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse and track civic issues across the city
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search issues..."
              className="input-dark pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-muted-foreground">
            Loading issues...
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            <div className="text-xs text-muted-foreground">
              {filtered.length} issues found
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((issue, i) => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  area={issue.area}
                  category={issue.category}
                  status={issue.status}
                  createdAt={new Date(issue.created_at).toLocaleDateString()}
                  votes={0}
                  verifications={0}
                  riskScore={issue.priority_score || 0}
                  escalationLevel={1}
                  impactScore={issue.priority_score || 0}
                  sentiment={issue.sentiment} // ✅ PASSING SENTIMENT
                  index={i}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No issues found.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
