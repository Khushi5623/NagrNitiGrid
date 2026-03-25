import { motion } from "framer-motion";
import { Shield, Clock, User, ArrowRight, FileText, CheckCircle, AlertTriangle } from "lucide-react";

const ledgerEntries = [
  { id: "CX-1247", action: "Issue escalated to Municipal Corporation", actor: "System", timestamp: "2 min ago", type: "escalation" },
  { id: "CX-1245", action: "Verified by 10 citizens - threshold reached", actor: "Community", timestamp: "15 min ago", type: "verification" },
  { id: "CX-1240", action: "Resolution confirmed with photo evidence", actor: "Ward Officer", timestamp: "1h ago", type: "resolution" },
  { id: "CX-1238", action: "New issue reported: Pothole on NH-44", actor: "Citizen #4821", timestamp: "2h ago", type: "report" },
  { id: "CX-1235", action: "Status changed: In Progress → Resolved", actor: "Municipal Corp", timestamp: "3h ago", type: "resolution" },
  { id: "CX-1230", action: "Issue escalated: No response in 48h", actor: "Auto-Escalation", timestamp: "5h ago", type: "escalation" },
  { id: "CX-1228", action: "Photo evidence added to case file", actor: "Citizen #2103", timestamp: "6h ago", type: "evidence" },
  { id: "CX-1225", action: "New issue reported: Water contamination", actor: "Citizen #7892", timestamp: "8h ago", type: "report" },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "escalation": return <AlertTriangle className="w-4 h-4" />;
    case "resolution": return <CheckCircle className="w-4 h-4" />;
    case "verification": return <Shield className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "escalation": return "text-warning bg-warning/10 border-warning/20";
    case "resolution": return "text-success bg-success/10 border-success/20";
    case "verification": return "text-primary bg-primary/10 border-primary/20";
    default: return "text-muted-foreground bg-muted border-border";
  }
};

const AccountabilityPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transparency</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Public Accountability Ledger</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every action is logged. Every escalation is tracked. Full transparency.
          </p>
        </motion.div>

        {/* Live indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success pulse-dot" />
            <span className="text-sm font-medium text-foreground">Live Activity Feed</span>
          </div>
          <span className="text-xs text-muted-foreground">{ledgerEntries.length} entries today</span>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-3">
          {ledgerEntries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-4 flex items-start gap-4 group hover:border-primary/20 cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${getTypeColor(entry.type)}`}>
                {getTypeIcon(entry.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-primary">{entry.id}</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {entry.timestamp}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">{entry.action}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <User className="w-3 h-3" /> {entry.actor}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountabilityPage;
