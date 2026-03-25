import { User, MapPin, AlertCircle, Users, Clock, Shield, TrendingUp, Calendar } from "lucide-react";

const recentAlerts = [
  { id: 1, type: "SOS Triggered", time: "2 days ago", location: "MG Road, Bangalore", status: "resolved" },
  { id: 2, type: "Safe Check-in", time: "5 days ago", location: "Home", status: "completed" },
  { id: 3, type: "Route Shared", time: "1 week ago", location: "Office to Home", status: "completed" },
];

const stats = [
  { icon: Shield, label: "Safe Journeys", value: "47", change: "+5 this week", color: "success" },
  { icon: Users, label: "Trusted Contacts", value: "3", change: "Active", color: "primary" },
  { icon: AlertCircle, label: "SOS Alerts", value: "1", change: "Last 30 days", color: "destructive" },
  { icon: MapPin, label: "Routes Saved", value: "12", change: "+2 new", color: "accent" },
];

const DashboardSection = () => {
  return (
    <section className="min-h-screen py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Safety Overview</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Personal <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Track your safety history, manage your profile, and stay informed about your protection status.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-3d p-6 rounded-2xl animate-fade-up">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground mb-4 shadow-soft">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">Sarah Johnson</h3>
                <p className="text-muted-foreground text-sm">sarah.j@email.com</p>

                {/* Verification Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Account</span>
                </div>

                {/* Quick Info */}
                <div className="w-full mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="font-medium text-foreground">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium text-foreground">+91 98XXX XXXXX</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Blood Group</span>
                    <span className="font-medium text-foreground">O+</span>
                  </div>
                </div>

                <button className="btn-3d w-full mt-6">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Last Known Location */}
            <div className="card-3d p-6 rounded-2xl animate-fade-up">
              <h4 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Last Known Location
              </h4>
              <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-xl mb-4 relative overflow-hidden">
                {/* Mini Map Placeholder */}
                <div className="absolute inset-0 opacity-40">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#miniGrid)" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">Koramangala, Bangalore</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Updated 5 mins ago
              </p>
            </div>
          </div>

          {/* Stats & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-up">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="card-3d p-5 rounded-2xl"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                    stat.color === "primary" ? "bg-primary/10 text-primary" :
                    stat.color === "success" ? "bg-success/10 text-success" :
                    stat.color === "destructive" ? "bg-destructive/10 text-destructive" :
                    "bg-accent text-accent-foreground"
                  }`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="font-display font-bold text-3xl text-foreground">{stat.value}</p>
                    <span className="text-xs text-muted-foreground mb-1">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="card-3d p-6 rounded-2xl animate-fade-up-delayed">
              <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </h4>

              <div className="space-y-4">
                {recentAlerts.map((alert, i) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      alert.type.includes("SOS") 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-success/10 text-success"
                    }`}>
                      {alert.type.includes("SOS") ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        <Shield className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-foreground">{alert.type}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.status === "resolved" 
                            ? "bg-success/10 text-success" 
                            : "bg-accent text-accent-foreground"
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium">
                View Full History
              </button>
            </div>

            {/* Safety Tips */}
            <div className="card-3d p-6 rounded-2xl animate-fade-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                    Safety Tip of the Day
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Always share your live location with a trusted contact when traveling alone at night. 
                    Use SafeRoute's "Journey Mode" to automatically notify them when you arrive safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
