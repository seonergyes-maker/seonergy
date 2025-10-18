export default function PoliticaPrivacidad() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">1. Información que recopilamos</h2>
            <p className="text-muted-foreground leading-relaxed">
              En Seonergy, recopilamos información que nos proporcionas directamente cuando:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Completas formularios de contacto en nuestro sitio web</li>
              <li>Solicitas un análisis SEO de tu sitio web</li>
              <li>Te comunicas con nosotros por correo electrónico, teléfono o WhatsApp</li>
              <li>Te suscribes a nuestros servicios</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Los datos personales que podemos recopilar incluyen: nombre, dirección de correo electrónico, número de teléfono, nombre de empresa y URL del sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">2. Cómo utilizamos tu información</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Responder a tus consultas y proporcionarte los servicios solicitados</li>
              <li>Realizar análisis SEO y enviarte informes personalizados</li>
              <li>Mejorar nuestros servicios y la experiencia del usuario</li>
              <li>Enviarte comunicaciones relacionadas con nuestros servicios (si has dado tu consentimiento)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">3. Base legal del tratamiento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tratamos tus datos personales basándonos en:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li><strong>Consentimiento:</strong> Cuando nos proporcionas tus datos voluntariamente a través de nuestros formularios</li>
              <li><strong>Ejecución de contrato:</strong> Para prestarte los servicios que has solicitado</li>
              <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y atender tus consultas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">4. Compartir información</h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing. Podemos compartir tu información únicamente en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
              <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">6. Seguridad de los datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, la pérdida o la alteración. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">7. Tus derechos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos o incompletos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al tratamiento de tus datos</li>
              <li>Solicitar la limitación del tratamiento</li>
              <li>Portabilidad de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Para ejercer estos derechos, contáctanos en: hola@seonergy.es
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">8. Retención de datos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos tus datos personales solo durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, incluyendo requisitos legales, contables o de informes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">9. Cambios en esta política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "última actualización".
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-bold mb-4">10. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tienes preguntas sobre esta Política de Privacidad, contáctanos:
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
