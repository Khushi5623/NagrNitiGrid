import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 px-6 text-white relative overflow-hidden">

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="max-w-4xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          Ready to Build <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Smarter, Transparent Cities?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
        >
          Join the civic intelligence movement and empower your city
          with AI-driven reporting, transparent workflows, and measurable
          governance performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <button
            onClick={() => navigate("/report")}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:scale-105"
          >
            Report Issue
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-all duration-300 hover:scale-105"
          >
            Get Started
          </button>
        </motion.div>

      </div>

    </section>
  );
};

export default CTASection;
