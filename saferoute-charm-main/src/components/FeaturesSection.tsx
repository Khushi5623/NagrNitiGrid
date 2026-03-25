import { motion } from "framer-motion";
import {
  ShieldCheck,
  Brain,
  BarChart3,
  MapPin,
  Users,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Issue Prioritization",
    desc: "Smart algorithms automatically rank issues based on severity, location impact, and urgency."
  },
  {
    icon: ShieldCheck,
    title: "Transparent Governance",
    desc: "Track every issue lifecycle with full visibility and real-time public accountability."
  },
  {
    icon: MapPin,
    title: "Geo-Tagged Reporting",
    desc: "Pinpoint exact issue locations with intelligent map-based submission."
  },
  {
    icon: Users,
    title: "Citizen Engagement System",
    desc: "Enable voting, feedback, and collaborative resolution within communities."
  },
  {
    icon: Clock,
    title: "Live Resolution Tracking",
    desc: "Monitor status updates from submission to completion with instant notifications."
  },
  {
    icon: BarChart3,
    title: "Analytics & Civic Insights",
    desc: "Data-driven dashboards empower authorities with measurable performance metrics."
  }
];

const FeaturesSection = () => {
  return (
    <section
  id="features"
  className="py-24 px-6 text-white relative overflow-hidden"
>



      {/* Soft overlay so text remains readable */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Features of NagarNiti  <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            
          </span>
        </motion.h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          NagarNiti Grid bridges the gap between citizens and governance
          through automation, AI intelligence, and measurable transparency.
        </p>

      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-6 group-hover:bg-cyan-500/20 transition">
                <Icon className="text-cyan-400" size={24} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}

      </div>

    </section>
  );
};

export default FeaturesSection;
