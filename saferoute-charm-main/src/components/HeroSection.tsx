import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full text-white overflow-hidden">

      {/* ===== GLOBAL BACKGROUND (Hero + Stats both) ===== */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/city-bg.png"
          alt="Smart City Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">

        <div className="text-center max-w-5xl">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Own the City. Own the Future.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            NagarNiti Grid connects people and governance through intelligent,
            real-time solutions. From reporting issues to tracking resolution,
            every action drives smarter cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/report")}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold transition shadow-lg"
            >
              Report an Issue
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="px-8 py-3 border border-gray-400 hover:bg-white/10 rounded-xl transition"
            >
              Explore Issues
            </button>
          </motion.div>

        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="pt-6 pb-16 px-6">


        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-2xl font-bold">1,247</h2>
            <p className="text-gray-300 mt-2 text-sm">Active Issues</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-2xl font-bold">34.2K</h2>
            <p className="text-gray-300 mt-2 text-sm">Citizens Active</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-2xl font-bold">8,903</h2>
            <p className="text-gray-300 mt-2 text-sm">Resolved</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center shadow-lg hover:scale-105 transition">
            <h2 className="text-2xl font-bold">18h</h2>
            <p className="text-gray-300 mt-2 text-sm">Avg Resolution</p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default HeroSection;
