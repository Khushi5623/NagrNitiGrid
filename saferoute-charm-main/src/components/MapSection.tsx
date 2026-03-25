import { MapPin, Navigation, Search, Shield, Clock, Route } from "lucide-react";
import { useState } from "react";

const MapSection = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <section className="min-h-screen py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Route className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Smart Navigation</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Find Your <span className="gradient-text">Safest Path</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered routing considers street lighting, police stations, and crowd density 
            to recommend the safest routes for your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Route Input Panel */}
          <div className="lg:col-span-1 space-y-6 animate-fade-up">
            <div className="card-3d p-6 rounded-2xl">
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Plan Your Route
              </h3>

              <div className="space-y-4">
                {/* Source Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-success rounded-full" />
                  <input
                    type="text"
                    placeholder="Starting point"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="input-3d pl-10"
                  />
                </div>

                {/* Connecting Line */}
                <div className="flex items-center gap-3 px-4">
                  <div className="w-0.5 h-8 bg-border ml-1" />
                </div>

                {/* Destination Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="input-3d pl-10"
                  />
                </div>

                <button className="btn-3d w-full flex items-center justify-center gap-2 mt-4">
                  <Search className="w-4 h-4" />
                  Find Safe Route
                </button>
              </div>
            </div>

            {/* Safety Features Cards */}
            <div className="space-y-3">
              {[
                { icon: Shield, label: "Police Stations Nearby", value: "3 within 1km" },
                { icon: MapPin, label: "Well-Lit Streets", value: "85% coverage" },
                { icon: Clock, label: "Estimated Time", value: "12 mins" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-3d p-4 rounded-xl flex items-center gap-4"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2 animate-fade-up-delayed">
            <div className="card-3d rounded-2xl overflow-hidden h-[500px] lg:h-full min-h-[400px]">
              <div className="w-full h-full bg-gradient-to-br from-accent/30 to-muted relative">
                {/* Mock Map Grid */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Mock Route */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                  {/* Safe Route Path */}
                  <path
                    d="M 80 350 Q 120 300 150 250 T 200 180 T 280 120 T 320 80"
                    fill="none"
                    stroke="hsl(168 65% 45%)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="0"
                    className="animate-pulse"
                  />
                  {/* Unsafe Route (dotted) */}
                  <path
                    d="M 80 350 Q 100 280 180 200 T 320 80"
                    fill="none"
                    stroke="hsl(0 75% 55%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="8 8"
                    opacity="0.4"
                  />
                </svg>

                {/* Location Markers */}
                <div className="absolute bottom-20 left-16 w-10 h-10 bg-success rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5 text-success-foreground" />
                </div>

                <div className="absolute top-16 right-20 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Safety Icons on Route */}
                <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-card rounded-lg flex items-center justify-center shadow-card float">
                  <Shield className="w-4 h-4 text-primary" />
                </div>

                <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-card rounded-lg flex items-center justify-center shadow-card float-delayed">
                  <Shield className="w-4 h-4 text-primary" />
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 card-3d p-3 rounded-xl">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-success rounded-full" />
                      <span className="text-muted-foreground">Safe Route</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-destructive/50 rounded-full" />
                      <span className="text-muted-foreground">Avoid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
