import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative py-20 px-6 text-white overflow-hidden">

      {/* Background Overlay (matches site theme) */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">
            NagarNiti Grid
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered civic intelligence platform built for transparent,
            accountable, and data-driven governance systems.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Product</h4>
          <ul className="space-y-3 text-gray-400 text-sm">

            <li
              onClick={() => navigate("/report")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Report Issue
            </li>

            <li
              onClick={() => navigate("/explore")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Explore Issues
            </li>

            <li
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Dashboard
            </li>

          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Resources</h4>
          <ul className="space-y-3 text-gray-400 text-sm">

            <li
              onClick={() => navigate("/signup")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Get Started
            </li>

            <li
              onClick={() => navigate("/signin")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Sign In
            </li>

            <li
              onClick={() => navigate("/accountability")}
              className="cursor-pointer hover:text-cyan-400 transition"
            >
              Transparency Ledger
            </li>

          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Legal</h4>
          <ul className="space-y-3 text-gray-400 text-sm">

            <li className="hover:text-cyan-400 transition cursor-pointer">
              Privacy Policy
            </li>

            <li className="hover:text-cyan-400 transition cursor-pointer">
              Terms of Service
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 border-t border-white/10 pt-6 text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} NagarNiti Grid. All rights reserved.
      </motion.div>

    </footer>
  );
};

export default Footer;
