import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Code, Zap, Lock, Globe } from "lucide-react";
import { Link } from "wouter";
import ServiceFAQ from "@/components/ServiceFAQ";
import { useEffect } from "react";

export default function DesarrolloWeb() {
  useEffect(() => {
    document.title = "Desarrollo web a medida y alto rendimiento | Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Funcionalidades a medida, velocidad y seguridad. Integramos APIs, landings y formularios avanzados listos para medir. Pide una demo.');
    }
  }, []);

  const faqs = [
    {
      question: "¿Migráis webs existentes?",
      answer: "Sí, realizamos migraciones completas con plan de redirecciones y sin perder SEO. Nos aseguramos de que todos los enlaces antiguos funcionen correctamente."
    },
    {
      question: "¿Soportáis multidioma?",
      answer: "Sí, trabajamos con soluciones como Polylang/WPML para WordPress o estructuras headless según las necesidades del proyecto."
    },
    {
      question: "¿Puedo pedir solo una landing?",
      answer: "Por supuesto. Entregamos landings específicas en 5–10 días según la complejidad, optimizadas para conversión y velocidad."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-1/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              <Code className="w-3 h-3 mr-2" />
              Desarrollo Web
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Desarrollo web rápido, seguro y medible
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Implementamos funcionalidades a medida sin sacrificar rendimiento ni SEO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" data-testid="button-cuentanos-tu-idea">
                  Cuéntanos tu idea
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/proyectos">
                <Button size="lg" variant="outline" data-testid="button-ver-integraciones">
                  Ver integraciones
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Casos y necesidades típicas
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Code, title: "Formularios avanzados", desc: "Paso a paso, uploads, validación y lógica condicional" },
              { icon: Globe, title: "Integraciones", desc: "CRM/ERP, pasarelas de pago, sistemas de reservas, mailing" },
              { icon: Zap, title: "Landings para Ads", desc: "Con test A/B y medición precisa de conversiones" },
              { icon: Lock, title: "Optimizaciones", desc: "Velocidad, accesibilidad y Core Web Vitals" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Tecnologías y calidad
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "WordPress (tema propio/ligero), Headless/Next.js cuando aporta valor",
              "Código semántico, schema markup y accesibilidad AA",
              "Seguridad: HTTPS, hardening básico, copias automáticas",
              "Consent Mode v2 y etiquetado listo para RGPD",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Entregables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Repositorio y guía de despliegue completa",
              "Documentación breve de componentes personalizados",
              "Checklist de QA (navegador, móvil, formularios, eventos GA4)",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Proceso
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              "Descubrimiento",
              "Arquitectura",
              "Desarrollo",
              "QA",
              "Lanzamiento + Soporte 30 días",
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full text-center">
                  <p className="font-mono text-3xl font-bold text-primary/20 mb-2">{String(index + 1).padStart(2, '0')}</p>
                  <p className="font-display text-sm font-bold">{step}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={faqs} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-chart-1/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para desarrollar tu proyecto?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Solicita una propuesta técnica y te responderemos en menos de 24 horas
            </p>
            <Link href="/contacto">
              <Button size="lg" data-testid="button-solicitar-propuesta">
                Solicitar propuesta técnica
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
