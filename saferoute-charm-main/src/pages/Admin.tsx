import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import StatusTimeline from "@/components/ui/StatusTimeline";

type Complaint = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  severity: string | null;
  status: string;
  image_url: string | null;
  created_at: string | null;
  assigned_at: string | null;
  resolved_at: string | null;
};

const ADMIN_EMAIL = "khushiofficial@gmail.com";

const AdminPage = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // =============================
  // ADMIN CHECK
  // =============================
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user || user.email !== ADMIN_EMAIL) {
        navigate("/");
        return;
      }

      setCheckingAdmin(false);
    };

    checkAdmin();
  }, [navigate]);

  // =============================
  // FETCH COMPLAINTS
  // =============================
  const fetchComplaints = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
      setComplaints([]);
    } else {
      setComplaints(data as Complaint[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!checkingAdmin) {
      fetchComplaints();
    }
  }, [checkingAdmin]);

  // =============================
  // UPDATE STATUS + NOTIFICATION
  // =============================
  const updateStatus = async (id: number, newStatus: string) => {
    const now = new Date().toISOString();

    // 🔎 First get complaint details
    const { data: complaintData, error: fetchError } = await supabase
      .from("complaints")
      .select("id, title, user_id")
      .eq("id", id)
      .single();

    if (fetchError || !complaintData) {
      alert("Failed to fetch complaint details");
      return;
    }

    const updateData: any = {
      status: newStatus,
      updated_at: now,
    };

    if (newStatus === "In Progress") {
      updateData.assigned_at = now;
    }

    if (newStatus === "Resolved") {
      updateData.resolved_at = now;
    }

    const { error } = await supabase
      .from("complaints")
      .update(updateData)
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    // 🔔 INSERT NOTIFICATION
    await supabase.from("notifications").insert([
      {
        user_id: complaintData.user_id,
        title: "Issue Status Updated",
        message: `Your issue "${complaintData.title}" is now marked as ${newStatus}`,
        type: "status",
      },
    ]);

    fetchComplaints();
  };

  // =============================
  // DELETE
  // =============================
  const deleteComplaint = async (id: number) => {
    if (!window.confirm("Delete this complaint?")) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("complaints")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      console.error("Delete error:", error);
    } else {
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    }

    setDeletingId(null);
  };

  // =============================
  // FILTER
  // =============================
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;

    const matchesStatus =
      statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking admin access...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white"
        >
          Admin Complaint Panel
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 w-full md:w-1/2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded px-3 py-2 w-full md:w-1/4"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {loading ? (
          <p className="text-white">Loading complaints...</p>
        ) : filteredComplaints.length === 0 ? (
          <p className="text-white">No matching complaints found.</p>
        ) : (
          <div className="relative border border-gray-700 rounded-lg p-4 bg-gray-950 overflow-visible">
            <table className="w-full text-sm text-white">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2">Title</th>
                  <th className="text-left py-2">Image</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Severity</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Update</th>
                  <th className="text-left py-2">Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="border-b border-gray-800 hover:bg-gray-900">
                    <td className="py-2">{c.title}</td>

                    <td className="py-2">
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt="complaint"
                          onClick={() => setSelectedImage(c.image_url)}
                          className="w-16 h-16 object-cover rounded-md border cursor-pointer"
                        />
                      ) : (
                        <span className="text-xs opacity-50">No Image</span>
                      )}
                    </td>

                    <td className="py-2">{c.category || "-"}</td>
                    <td className="py-2">{c.severity || "-"}</td>

                    <td className="py-2">
                      <div className="font-medium">{c.status}</div>
                      <StatusTimeline
                        status={c.status}
                        created_at={c.created_at}
                        assigned_at={c.assigned_at}
                        resolved_at={c.resolved_at}
                      />
                    </td>

                    <td className="py-2 relative">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          updateStatus(c.id, e.target.value)
                        }
                        className="relative z-50 bg-gray-800 text-white border border-gray-600 rounded px-3 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="py-2">
                      <button
                        type="button"
                        disabled={deletingId === c.id}
                        onClick={() => deleteComplaint(c.id)}
                        className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-3 py-1 rounded text-xs"
                      >
                        {deletingId === c.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="full-view"
              className="max-h-[80vh] rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
