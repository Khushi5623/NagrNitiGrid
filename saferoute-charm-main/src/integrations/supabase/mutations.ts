import { supabase } from "./client";

export const updateComplaintStatus = async (
  complaintId: number,
  newStatus: string,
  actor: string = "System",
  details: string = ""
) => {
  const now = new Date().toISOString();

  const updateData: Record<string, any> = {
    status: newStatus,
    updated_at: now,
  };

  if (newStatus === "assigned") {
    updateData.assigned_at = now;
  }

  if (newStatus === "resolved") {
    updateData.resolved_at = now;
  }

  // 🔹 Update complaint (typed bypass)
  const { error: updateError } = await (supabase as any)
    .from("complaints")
    .update(updateData)
    .eq("id", complaintId);

  if (updateError) {
    console.error("Status update failed:", updateError);
    return null;
  }

  // 🔹 Insert log entry (typed bypass)
  const { error: logError } = await (supabase as any)
    .from("complaint_logs")
    .insert({
      complaint_id: complaintId,
      action: newStatus,
      actor,
      details,
      created_at: now,
    });

  if (logError) {
    console.error("Log creation failed:", logError);
    return null;
  }

  return true;
};
