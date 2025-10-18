import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Megaphone, Target, BarChart, Zap } from "lucide-react";
import { Link } from "wouter";
import ServiceFAQ from "@/components/ServiceFAQ";
import { useEffect } from "react";

export default function MarketingAds() {
  useEffect(() => {
    document.title = "Marketing y Ads para vender más (Google & Meta) | Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Campañas enfocadas a resultados: Google Ads, Meta Ads y medición de leads. Landing pages, creatividades y optimización continua. Hablemos.');
    }
  }, []);

  const faqs = [
    {
      question: "¿Necesito gran presupuesto?",
      answer: "No es necesario. Con poco presupuesto se puede validar. Recomendamos empezar con un test de 2–4 semanas para evaluar el rendimiento."
    },
    {
      question: "¿Quién hace las creatividades?",
      answer: "Podemos crear las creatividades (imágenes, textos, vídeos) o trabajar con tus assets existentes, lo que mejor se adapte a tu proyecto."
    },
    {
      question: "¿Puedo pausar cuando quiera?",
      answer: "Sí, trabajamos sin permanencias. Solo pedimos que nos avises con antelación para cerrar las campañas correctamente."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-3/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              <Megaphone className="w-3 h-3 mr-2" />
              Marketing & Ads
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Anuncios que generan leads y ventas medibles
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Montamos y optimizamos campañas en Google & Meta con tracking impecable y landings que convierten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" data-testid="button-lanza-tus-campanas">
                  Lanza tus campañas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" data-testid="button-ver-paquetes">
                Ver paquetes
              </Button>
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
              Qué hacemos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Google Ads", desc: "Búsqueda, Performance Max y Remarketing" },
              { icon: Megaphone, title: "Meta Ads", desc: "Tráfico y generación de clientes potenciales" },
              { icon: Zap, title: "Landing Pages", desc: "Específicas con test A/B para maximizar conversión" },
              { icon: BarChart, title: "Medición", desc: "GA4, conversiones, Consent-aware tagging y CRM" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
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
              Metodología
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Investigación", desc: "Palabras clave, audiencias y competencia" },
              { num: "02", title: "Estructura", desc: "Campañas, grupos y creatividades" },
              { num: "03", title: "Optimización", desc: "Semanal: pujas, términos, anuncios y landings" },
              { num: "04", title: "Informes", desc: "CPA/ROAS, leads cualificados y acciones" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <p className="font-mono text-4xl font-bold text-primary/20 mb-3">{step.num}</p>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
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
              Paquetes
            </h2>
            <p className="text-lg text-muted-foreground">
              Servicios flexibles adaptados a tu presupuesto y objetivos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <Badge className="mb-4">Setup único</Badge>
              <h3 className="font-display text-2xl font-bold mb-3">
                Investigación + Estructura + Tracking
              </h3>
              <p className="text-muted-foreground mb-6">
                Configuración inicial completa de tus campañas con tracking impecable
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Investigación de keywords y audiencias",
                  "Estructura de campañas optimizada",
                  "Configuración de conversiones",
                  "Setup de GA4 y eventos",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contacto">
                <Button className="w-full" data-testid="button-setup-package">
                  Solicitar setup
                </Button>
              </Link>
            </Card>

            <Card className="p-8 border-primary">
              <Badge className="mb-4">Mensual</Badge>
              <h3 className="font-display text-2xl font-bold mb-3">
                Gestión + Optimización + Informes
              </h3>
              <p className="text-muted-foreground mb-6">
                Gestión continua con optimización semanal y reporting detallado
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Optimización semanal de campañas",
                  "Test A/B de anuncios y landings",
                  "Informes mensuales detallados",
                  "Llamadas de seguimiento",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contacto">
                <Button className="w-full" variant="default" data-testid="button-monthly-package">
                  Solicitar gestión
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={faqs} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-chart-3/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para vender más?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Hablemos de tus objetivos y diseñemos una estrategia de anuncios a medida
            </p>
            <Link href="/contacto">
              <Button size="lg" data-testid="button-quiero-vender-mas">
                Quiero vender más con Ads
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
