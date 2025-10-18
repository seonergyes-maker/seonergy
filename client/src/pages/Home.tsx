import { useState } from "react";
import Header from "@/components/Header";
import FullscreenMenu from "@/components/FullscreenMenu";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ProcessTimeline from "@/components/ProcessTimeline";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsShowcase />
        <ProcessTimeline />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
