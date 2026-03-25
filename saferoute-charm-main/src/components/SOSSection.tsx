import { Phone, AlertTriangle, Siren, Hospital, Shield, Users } from "lucide-react";

const emergencyContacts = [
  { icon: Siren, label: "Police", number: "100", color: "primary" },
  { icon: Hospital, label: "Ambulance", number: "102", color: "success" },
  { icon: AlertTriangle, label: "Women Helpline", number: "1091", color: "destructive" },
  { icon: Shield, label: "Child Helpline", number: "1098", color: "accent" },
];

const SOSSection = () => {
  return (
    <section className="min-h-screen py-20 md:py-24 relative overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Emergency Alert</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              One Tap <span className="text-destructive">SOS Alert</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              In case of emergency, press the SOS button to instantly alert your trusted contacts 
              and nearby emergency services with your live location.
            </p>
          </div>

          {/* SOS Button */}
          <div className="flex justify-center mb-16 animate-fade-up">
            <button className="relative group">
              {/* Outer Ripples */}
              <div className="absolute inset-0 scale-150">
                <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "2s" }} />
              </div>
              <div className="absolute inset-0 scale-125">
                <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
              </div>

              {/* Main Button */}
              <div className="sos-pulse w-40 h-40 md:w-48 md:h-48 flex items-center justify-center cursor-pointer relative z-10 group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <span className="font-display font-bold text-4xl md:text-5xl text-white drop-shadow-lg">SOS</span>
                  <p className="text-white/90 text-sm mt-1">Press & Hold</p>
                </div>
              </div>
            </button>
          </div>

          {/* Emergency Helplines */}
          <div className="animate-fade-up-delayed">
            <h3 className="font-display font-semibold text-xl text-center mb-8 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Emergency Helplines
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyContacts.map((contact, i) => (
                <a
                  key={i}
                  href={`tel:${contact.number}`}
                  className="card-3d p-6 rounded-2xl text-center group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    contact.color === "primary" ? "bg-primary/10 text-primary" :
                    contact.color === "success" ? "bg-success/10 text-success" :
                    contact.color === "destructive" ? "bg-destructive/10 text-destructive" :
                    "bg-accent text-accent-foreground"
                  }`}>
                    <contact.icon className="w-7 h-7" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{contact.label}</p>
                  <p className="font-display font-bold text-2xl text-foreground group-hover:text-primary transition-colors">
                    {contact.number}
                  </p>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-primary font-medium">Tap to call →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* What happens when you press SOS */}
          <div className="mt-16 card-3d p-6 md:p-8 rounded-2xl animate-fade-up">
            <h4 className="font-display font-semibold text-lg mb-6 text-center">
              What happens when you press SOS?
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Location Shared", desc: "Your live GPS location is captured instantly" },
                { step: "2", title: "Contacts Alerted", desc: "All trusted contacts receive SMS & call alerts" },
                { step: "3", title: "Audio Recording", desc: "Ambient audio is recorded for evidence" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-primary">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SOSSection;
