import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, ArrowUp } from "lucide-react";

interface EscalationLadderProps {
  currentLevel: number; // 0-4
  title?: string;
}

const levels = [
  { label: "Filed", icon: CheckCircle, description: "Issue logged" },
  { label: "Verified", icon: CheckCircle, description: "Community verified" },
  { label: "Escalated", icon: ArrowUp, description: "Sent to authority" },
  { label: "Critical", icon: AlertTriangle, description: "Priority alert" },
  { label: "Resolved", icon: CheckCircle, description: "Action taken" },
];

const EscalationLadder = ({ currentLevel, title = "Escalation Status" }: EscalationLadderProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-display font-semibold text-sm text-foreground">{title}</h4>
      <div className="flex items-center gap-1">
        {levels.map((level, i) => {
          const isActive = i <= currentLevel;
          const isCurrent = i === currentLevel;
          return (
            <div key={i} className="flex items-center gap-1 flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? "bg-primary/20 text-primary border border-primary/40 shadow-neon"
                      : isActive
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <level.icon className="w-4 h-4" />
                </div>
                <span className={`text-[9px] text-center leading-tight ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {level.label}
                </span>
              </motion.div>
              {i < levels.length - 1 && (
                <div className={`h-0.5 flex-1 rounded-full mt-[-14px] ${
                  i < currentLevel ? "bg-success/50" : "bg-border"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EscalationLadder;
