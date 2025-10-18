import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Contacto() {
  useEffect(() => {
    document.title = "Contacto - Solicita tu Presupuesto Web | Seonergy Yecla";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contacta con Seonergy en Yecla. Solicita presupuesto sin compromiso para tu proyecto web, SEO o desarrollo. Respuesta en menos de 24 horas.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'contacto agencia web yecla, presupuesto diseño web, solicitar presupuesto seo, contactar agencia digital murcia, pedir presupuesto web');
  }, []);

  return (
    <div className="pt-20">
      <ContactForm />
    </div>
  );
}
