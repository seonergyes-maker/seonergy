import ProcessTimeline from "@/components/ProcessTimeline";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Proceso() {
  useEffect(() => {
    document.title = "Metodología y Proceso de Trabajo | Cómo Trabajamos en Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conoce nuestra metodología de trabajo en 5 fases: Investigación, Diseño, Desarrollo, Lanzamiento y Crecimiento. Proceso estructurado con resultados garantizados.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'metodología web, proceso diseño web, fases proyecto web, cómo trabajamos, plan de trabajo seo, metodología agencia digital');
  }, []);

  return (
    <div className="pt-20">
      <ProcessTimeline />
      <ContactForm />
    </div>
  );
}
