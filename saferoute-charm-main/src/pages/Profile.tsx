import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  trust_score: number;
  total_reports: number;
  valid_reports: number;
  spam_reports: number;
}

interface Issue {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [myIssues, setMyIssues] = useState<Issue[]>([]); // ✅ NEW STATE
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setLoading(false);
          return;
        }

        // ✅ Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("trust_score, total_reports, valid_reports, spam_reports")
          .eq("id", session.user.id)
          .single();

        if (!profileError && profileData) {
          setProfile(profileData as ProfileData);
        }

        // ✅ Fetch ONLY this user's complaints
        const { data: issuesData, error: issuesError } = await supabase
          .from("complaints")
          .select("id, title, status, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (!issuesError && issuesData) {
          setMyIssues(issuesData as Issue[]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBadge = (score: number) => {
    if (score >= 80) return "👑 Elite Citizen";
    if (score >= 60) return "🏅 Trusted Citizen";
    if (score >= 30) return "🙂 Active Citizen";
    return "⚠ Low Trust";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-xl"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">
          👤 My Profile
        </h1>

        {/* Trust Score */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            ⭐ Trust Score: {profile.trust_score} / 100
          </h2>

          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profile.trust_score}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_20px_cyan]"
            />
          </div>

          <p className="mt-3 text-sm text-gray-300">
            {getBadge(profile.trust_score)}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 p-4 rounded-xl border border-cyan-500/10">
            <p className="text-sm text-gray-400">Total Reports</p>
            <p className="text-2xl font-bold text-white">
              {profile.total_reports}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-green-500/20">
            <p className="text-sm text-gray-400">Valid Reports</p>
            <p className="text-2xl font-bold text-green-400">
              {profile.valid_reports}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl border border-red-500/20">
            <p className="text-sm text-gray-400">Spam Reports</p>
            <p className="text-2xl font-bold text-red-400">
              {profile.spam_reports}
            </p>
          </div>
        </div>

        {/* ✅ My Reported Issues Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            📋 My Reported Issues
          </h2>

          {myIssues.length === 0 ? (
            <p className="text-gray-400 text-sm">
              You have not reported any issues yet.
            </p>
          ) : (
            <div className="space-y-4">
              {myIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-gray-900 p-4 rounded-xl border border-cyan-500/10"
                >
                  <h3 className="font-medium text-white">
                    {issue.title}
                  </h3>

                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-400">
                      {new Date(issue.created_at).toLocaleDateString()}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        issue.status === "Resolved"
                          ? "bg-green-500/20 text-green-400"
                          : issue.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
