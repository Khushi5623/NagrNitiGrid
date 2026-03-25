import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navigation from "./components/Navigation";
import AnimatedBackground from "./components/AnimatedBackground";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

/* ===============================
   LAZY IMPORTS
================================= */

const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Report = lazy(() => import("./pages/Report"));
const Explore = lazy(() => import("./pages/Explore"));
const Accountability = lazy(() => import("./pages/Accountability"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Signup = lazy(() => import("./pages/signup"));
const Signin = lazy(() => import("./pages/signin"));
const Profile = lazy(() => import("./pages/Profile"));

/* ===============================
   LOADING SCREEN
================================= */

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

/* ===============================
   APP
================================= */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AnimatedBackground />

          {/* MAIN LAYOUT WRAPPER */}
          <div className="flex flex-col min-h-screen">

            {/* NAVBAR */}
            <Navigation />

            {/* PAGE CONTENT */}
            <div className="flex-grow">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/accountability" element={<Accountability />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>

            {/* FOOTER ALWAYS BOTTOM */}
            <Footer />

          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
