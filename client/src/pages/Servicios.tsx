import ServicesSection from "@/components/ServicesSection";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Servicios() {
  useEffect(() => {
    document.title = "Servicios de Diseño Web, SEO y Desarrollo | Seonergy Yecla";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Servicios profesionales de diseño web, SEO estratégico, desarrollo web y marketing digital en Yecla. Soluciones a medida para pymes y comercios.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'servicios diseño web, seo profesional, desarrollo web, marketing digital, google ads, meta ads, páginas web yecla, servicios digitales murcia');
  }, []);

  return (
    <div className="pt-20">
      <ServicesSection />
      <ContactForm />
    </div>
  );
}
