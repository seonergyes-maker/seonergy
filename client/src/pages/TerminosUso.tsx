import { useEffect } from "react";

export default function TerminosUso() {
  useEffect(() => {
    document.title = "Términos de Uso | Condiciones Legales - Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Términos y condiciones de uso del sitio web de Seonergy. Conoce las normas y políticas para el uso de nuestros servicios digitales.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'términos uso, condiciones legales, aviso legal, condiciones servicio, términos condiciones web');
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
          Términos de Uso
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">1. Aceptación de los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar el sitio web de Seonergy (en adelante, "el Sitio"), aceptas estar sujeto a estos Términos de Uso y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar este Sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">2. Uso del sitio web</h2>
            <p className="text-muted-foreground leading-relaxed">
              El contenido de este Sitio es solo para tu información general y uso personal. Está sujeto a cambios sin previo aviso. Te comprometes a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Utilizar el Sitio solo para fines legítimos</li>
              <li>No utilizar el Sitio de manera que pueda dañar, deshabilitar, sobrecargar o deteriorar el Sitio</li>
              <li>No intentar obtener acceso no autorizado a ninguna parte del Sitio</li>
              <li>No transmitir material que contenga virus o cualquier otro código informático dañino</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">3. Propiedad intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido incluido en este Sitio, como textos, gráficos, logotipos, iconos, imágenes, clips de audio y software, es propiedad de Seonergy o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual españolas e internacionales.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              No está permitido reproducir, duplicar, copiar, vender, revender o explotar cualquier parte del Sitio sin nuestro permiso expreso por escrito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">4. Servicios ofrecidos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Seonergy ofrece servicios de diseño web, SEO y desarrollo de software. La información sobre nuestros servicios se proporciona "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nos reservamos el derecho de modificar o discontinuar cualquier servicio sin previo aviso en cualquier momento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">5. Análisis SEO gratuito</h2>
            <p className="text-muted-foreground leading-relaxed">
              El análisis SEO gratuito que ofrecemos es una evaluación preliminar de tu sitio web. Los resultados son orientativos y no constituyen una auditoría completa. Nos reservamos el derecho de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Limitar el número de análisis gratuitos por usuario</li>
              <li>Rechazar solicitudes que consideremos fraudulentas o abusivas</li>
              <li>Modificar o suspender este servicio en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">6. Enlaces a terceros</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestro Sitio puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por Seonergy. No tenemos control sobre, y no asumimos responsabilidad por, el contenido, políticas de privacidad o prácticas de sitios web de terceros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">7. Limitación de responsabilidad</h2>
            <p className="text-muted-foreground leading-relaxed">
              En ningún caso Seonergy será responsable de daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar este Sitio o cualquier servicio proporcionado a través de él.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">8. Indemnización</h2>
            <p className="text-muted-foreground leading-relaxed">
              Aceptas indemnizar y eximir de responsabilidad a Seonergy y sus afiliados, directores, empleados y agentes de cualquier reclamación, daño, obligación, pérdida, responsabilidad, costo o deuda, y gastos que surjan de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Tu uso y acceso al Sitio</li>
              <li>Tu violación de estos Términos de Uso</li>
              <li>Tu violación de los derechos de terceros</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">9. Modificaciones de los términos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio. Tu uso continuado del Sitio después de dichos cambios constituye tu aceptación de los nuevos términos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">10. Ley aplicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estos Términos de Uso se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Murcia, España.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">11. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre estos Términos de Uso, contáctanos:
            </p>
            <ul className="list-none text-muted-foreground space-y-2 mt-4">
              <li><strong>Email:</strong> hola@seonergy.es</li>
              <li><strong>Teléfono:</strong> +34 604 83 92 62</li>
              <li><strong>Dirección:</strong> Yecla, Murcia, España</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
