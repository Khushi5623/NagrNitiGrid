import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number; // 0-100
  label?: string;
  size?: "sm" | "md" | "lg";
}

const RiskMeter = ({ score, label = "Risk Level", size = "md" }: RiskMeterProps) => {
  const getColor = () => {
    if (score <= 30) return "hsl(155, 80%, 45%)";
    if (score <= 60) return "hsl(38, 92%, 55%)";
    return "hsl(0, 72%, 55%)";
  };

  const getLabel = () => {
    if (score <= 30) return "Low";
    if (score <= 60) return "Medium";
    return "High";
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
  };

  const radius = size === "sm" ? 32 : size === "md" ? 46 : 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${(radius + 6) * 2} ${(radius + 6) * 2}`}>
          <circle
            cx={radius + 6}
            cy={radius + 6}
            r={radius}
            fill="none"
            stroke="hsl(222, 30%, 16%)"
            strokeWidth={size === "sm" ? 4 : 6}
          />
          <motion.circle
            cx={radius + 6}
            cy={radius + 6}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={size === "sm" ? 4 : 6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-foreground" style={{ fontSize: size === "sm" ? "1rem" : size === "md" ? "1.5rem" : "2rem" }}>
            {score}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{getLabel()}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

export default RiskMeter;
