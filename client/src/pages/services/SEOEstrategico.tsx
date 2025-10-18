import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, TrendingUp, Search, MapPin, BarChart } from "lucide-react";
import { Link } from "wouter";
import ServiceFAQ from "@/components/ServiceFAQ";
import { useEffect } from "react";

export default function SEOEstrategico() {
  useEffect(() => {
    document.title = "SEO estratégico para pymes: más tráfico cualificado | Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Plan SEO completo: auditoría técnica, contenidos, SEO local y medición. Enfocado a leads y ventas, no solo posiciones. Solicita tu plan.');
    }
  }, []);

  const faqs = [
    {
      question: "¿Cuándo se ven resultados?",
      answer: "Las primeras mejoras suelen verse en 4–8 semanas. El crecimiento sostenido se consolida entre 3–6 meses, dependiendo de la competencia y el estado inicial."
    },
    {
      question: "¿Incluye creación de contenidos?",
      answer: "Podemos crear contenidos optimizados o guiar a tu equipo en la estrategia. Tú eliges la opción que mejor se adapte a tu proyecto."
    },
    {
      question: "¿Firmamos objetivos?",
      answer: "Definimos KPIs realistas (tráfico orgánico, leads, posiciones) y los revisamos mensualmente con informes detallados y próximas acciones."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-2/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              <TrendingUp className="w-3 h-3 mr-2" />
              SEO Estratégico
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              SEO que impacta en ventas, no solo en rankings
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Estrategia SEO integral: técnico, contenidos y local con objetivos medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" data-testid="button-quiero-mi-plan-seo">
                  Quiero mi plan SEO
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/proceso">
                <Button size="lg" variant="outline" data-testid="button-ver-metodologia">
                  Ver metodología
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
              Qué incluye el plan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Auditoría técnica", desc: "Rastreo, indexación, canónicos, CWV, schema markup" },
              { icon: BarChart, title: "Mapa de contenidos", desc: "Por intención de búsqueda y etapa del funnel" },
              { icon: MapPin, title: "SEO local", desc: "Google Business Profile, citas, reseñas, on-page local" },
              { icon: TrendingUp, title: "Optimización on-page", desc: "Titles, metas, interlinking, enriquecido semántico" },
              { icon: BarChart, title: "Tracking completo", desc: "GA4 + Search Console + panel de KPIs" },
              { icon: Check, title: "Roadmap 90 días", desc: "Prioridades basadas en impacto vs esfuerzo" },
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
              Entregables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Documento estratégico: objetivos, keywords, arquitectura y calendario",
              "Implementaciones clave y guía detallada para contenidos",
              "Revisión mensual con análisis de resultados y próximas acciones",
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Resultados esperados
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">
                Más leads desde orgánico y Maps
              </h3>
              <p className="text-muted-foreground">
                Incremento sostenible del tráfico cualificado que genera conversiones
              </p>
            </Card>
            <Card className="p-8">
              <Search className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">
                Mejora del CTR y experiencia móvil
              </h3>
              <p className="text-muted-foreground">
                Mayor visibilidad en buscadores y mejor experiencia de usuario
              </p>
            </Card>
          </div>
        </div>
      </section>

      <ServiceFAQ faqs={faqs} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-chart-2/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para crecer en Google?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Solicita tu auditoría SEO gratuita y descubre tu potencial
            </p>
            <Link href="/analiza-tu-web">
              <Button size="lg" data-testid="button-pide-auditoria">
                Pide tu auditoría SEO
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
