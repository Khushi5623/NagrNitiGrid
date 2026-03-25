import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import FinalCTA from "../components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO */}
      <HeroSection />

      {/* FEATURES */}
      <FeaturesSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};

export default Index;
