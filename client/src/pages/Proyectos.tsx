import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Proyectos() {
  useEffect(() => {
    document.title = "Portfolio de Proyectos Web y SEO | Casos de Éxito Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubre nuestros casos de éxito en diseño web, SEO y desarrollo. Portfolio de proyectos reales con resultados medibles para empresas de Yecla y Murcia.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'portfolio web, casos de éxito seo, proyectos diseño web, trabajos realizados yecla, ejemplos webs murcia, portfolio agencia digital');
  }, []);

  return (
    <div className="pt-20">
      <ProjectsShowcase />
      <ContactForm />
    </div>
  );
}
