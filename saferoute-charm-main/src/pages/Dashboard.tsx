import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Users,
  Activity,
} from "lucide-react";
import RiskMeter from "@/components/RiskMeter";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const areaData = [
  { name: "Sector 7", health: 45 },
  { name: "Ward 12", health: 62 },
  { name: "Central District", health: 78 },
  { name: "Industrial Zone", health: 38 },
  { name: "Green Belt", health: 85 },
];

const DashboardPage = () => {
  const [complaints, setComplaints] = useState<any[]>([]);

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/complaints");
        const data = await response.json();
        setComplaints(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // =============================
  // Dynamic Stats
  // =============================
  const openIssues = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const overviewStats = [
    {
      label: "Open Issues",
      value: openIssues,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Activity,
      color: "text-blue-500",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Total Issues",
      value: complaints.length,
      icon: Users,
      color: "text-purple-500",
    },
  ];

  // =============================
  // Category Chart Data
  // =============================
  const categoryCounts: Record<string, number> = {};

  complaints.forEach((c) => {
    const cat = c.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryLabels = Object.keys(categoryCounts);
  const categoryValues = Object.values(categoryCounts);

  const doughnutData = {
    labels: categoryLabels.length ? categoryLabels : ["No Data"],
    datasets: [
      {
        data: categoryValues.length ? categoryValues : [1],
        backgroundColor: [
          "#06b6d4",
          "#f59e0b",
          "#22c55e",
          "#8b5cf6",
          "#ef4444",
          "#3b82f6",
        ],
        borderWidth: 0,
      },
    ],
  };

  // =============================
  // Weekly Chart Data
  // =============================
  const dailyCounts: Record<string, number> = {};

  complaints.forEach((c) => {
    if (!c.created_at) return;
    const date = new Date(c.created_at).toLocaleDateString();
    dailyCounts[date] = (dailyCounts[date] || 0) + 1;
  });

  const weekLabels = Object.keys(dailyCounts).slice(-7);
  const weekValues = Object.values(dailyCounts).slice(-7);

  const barData = {
    labels: weekLabels.length ? weekLabels : ["No Data"],
    datasets: [
      {
        label: "Reported",
        data: weekValues.length ? weekValues : [0],
        backgroundColor: "#06b6d4",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            Civic Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time complaint analytics
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {overviewStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-display font-bold text-2xl">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-5">
            <div className="h-64">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="h-48">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Area Health */}
        <div className="glass-card p-5">
          <div className="grid md:grid-cols-5 gap-4">
            {areaData.map((area, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <RiskMeter score={100 - area.health} label="" size="sm" />
                <div className="text-center">
                  <p className="text-xs">{area.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
