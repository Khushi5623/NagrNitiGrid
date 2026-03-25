import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Compass,
  Shield,
  Activity,
  ChevronRight,
  Zap,
  User,
} from "lucide-react";

import NotificationBell from "./NotificationBell"; // ✅ ADDED

const navItems = [
  { path: "/", label: "Home", icon: Zap },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/report", label: "Report", icon: FileText },
  { path: "/explore", label: "Explore", icon: Compass },
  { path: "features", label: "Features", icon: Shield },
  { path: "/admin", label: "Admin", icon: Activity },
  { path: "/profile", label: "My Profile", icon: User },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFeaturesClick = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("features");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("features");
        section?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wider text-white leading-none">
                NagarNiti Grid
              </span>
              <span className="text-[10px] font-medium tracking-[0.3em] text-cyan-400">
                X
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.path === "features") {
                return (
                  <button
                    key="features"
                    onClick={handleFeaturesClick}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + AUTH */}
          <div className="hidden md:flex items-center gap-3">

            {/* 🔔 Notification Bell Added */}
            <NotificationBell />

            <Link
              to="/signin"
              className="text-sm font-medium text-gray-400 hover:text-white transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-full text-sm font-semibold text-black
              bg-gradient-to-r from-cyan-400 to-blue-500
              shadow-lg hover:shadow-cyan-500/40
              transition-all duration-300"
            >
              Sign Up
            </Link>

            <Link
              to="/report"
              className="px-4 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-purple-500 to-cyan-500
              text-white flex items-center gap-2
              hover:scale-105 transition-all duration-300"
            >
              Report Issue
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-white rounded-full" />
              <span className="w-3/4 h-0.5 bg-cyan-400 rounded-full" />
              <span className="w-1/2 h-0.5 bg-white rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-md bg-black/80 border-t border-gray-800 pb-safe z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 6).map((item) => {
            const Icon = item.icon;

            if (item.path === "features") {
              return (
                <button
                  key="features-mobile"
                  onClick={handleFeaturesClick}
                  className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-cyan-400 transition"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">
                    {item.label}
                  </span>
                </button>
              );
            }

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 transition ${
                  isActive ? "text-cyan-400" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
