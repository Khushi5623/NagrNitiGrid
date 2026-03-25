type StatusTimelineProps = {
  status: string;
  created_at?: string | null;
  assigned_at?: string | null;
  resolved_at?: string | null;
};

const StatusTimeline = ({
  status,
  created_at,
  assigned_at,
  resolved_at,
}: StatusTimelineProps) => {
  // ✅ Normalize status (prevents case issues like "Resolved" vs "resolved")
  const currentStatus = status?.toLowerCase() || "";

  const steps = [
    {
      label: "Submitted",
      active: true,
      date: created_at,
    },
    {
      label: "Assigned",
      active:
        currentStatus === "assigned" ||
        currentStatus === "resolved",
      date: assigned_at,
    },
    {
      label: "Resolved",
      active: currentStatus === "resolved",
      date: resolved_at,
    },
  ];

  return (
    <div className="flex items-center gap-6 mt-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">

          {/* Circle */}
          <div
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              step.active ? "bg-green-500" : "bg-gray-600"
            }`}
          />

          {/* Label + Date */}
          <div className="text-xs text-gray-300">
            <p>{step.label}</p>
            {step.date && (
              <p className="text-[10px] opacity-60">
                {new Date(step.date).toLocaleString()}
              </p>
            )}
          </div>

          {/* Line Between Steps */}
          {index !== steps.length - 1 && (
            <div
              className={`w-6 h-[1px] ml-2 transition-colors duration-300 ${
                steps[index + 1].active
                  ? "bg-green-500"
                  : "bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusTimeline;
