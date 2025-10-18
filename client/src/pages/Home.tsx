import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Seonergy - Agencia Digital en Yecla | Diseño Web, SEO y Programación";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Agencia digital en Yecla, Murcia. Diseño web profesional, SEO estratégico y desarrollo de software a medida. Transformamos tu presencia digital con resultados medibles.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'agencia digital yecla, diseño web yecla, seo yecla, programación web murcia, desarrollo web yecla, marketing digital yecla, posicionamiento web murcia');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
    </div>
  );
}
