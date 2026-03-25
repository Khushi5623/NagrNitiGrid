import { motion } from "framer-motion";
import {
  ThumbsUp,
  Eye,
  Clock,
  MapPin,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import RiskMeter from "./RiskMeter";
import EscalationLadder from "./EscalationLadder";

interface IssueCardProps {
  title: string;
  area: string;
  category: string;
  status: string;
  votes: number;
  verifications: number;
  riskScore: number;
  escalationLevel: number;
  impactScore: number;
  createdAt: string;
  sentiment?: "Positive" | "Neutral" | "Negative"; // ✅ NEW
  index?: number;
}

const IssueCard = ({
  title,
  area,
  category,
  status,
  votes,
  verifications,
  riskScore,
  escalationLevel,
  impactScore,
  createdAt,
  sentiment,
  index = 0,
}: IssueCardProps) => {
  // ✅ Status Colors
  const statusColors: Record<string, string> = {
    open: "bg-warning/10 text-warning border-warning/20",
    "in-progress": "bg-primary/10 text-primary border-primary/20",
    resolved: "bg-success/10 text-success border-success/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  // ✅ Sentiment Colors
  const sentimentColors: Record<string, string> = {
    Positive: "bg-green-500/10 text-green-400 border-green-500/20",
    Neutral: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Negative: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card p-5 space-y-4 group cursor-pointer"
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Badges Row */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            
            {/* Status */}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${
                statusColors[status] || statusColors.open
              }`}
            >
              {status}
            </span>

            {/* Category */}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {category}
            </span>

            {/* ✅ Sentiment Badge */}
            {sentiment && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                  sentimentColors[sentiment]
                }`}
              >
                {sentiment}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {title}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{area}</span>
            <span>•</span>
            <Clock className="w-3 h-3" />
            <span>{createdAt}</span>
          </div>
        </div>

        {/* Risk Meter */}
        <RiskMeter score={riskScore} label="" size="sm" />
      </div>

      {/* ================= ESCALATION ================= */}
      <EscalationLadder currentLevel={escalationLevel} title="" />

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{votes}</span>
          </button>

          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-success transition-colors">
            <Eye className="w-3.5 h-3.5" />
            <span>{verifications}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Impact: {impactScore}</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </motion.div>
  );
};

export default IssueCard;
