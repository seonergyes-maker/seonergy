import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket, TrendingUp, Check, Clock, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Investigación",
    subtitle: "Investigación & Estrategia",
    description: "Analizamos tu negocio, audiencia y competencia para crear una estrategia sólida y efectiva.",
    duration: "2–5 días laborables",
    tasks: [
      "Entrevista inicial y definición de objetivos (ventas, leads, visibilidad local)",
      "Auditoría rápida: técnica (SEO/velocidad), UX y analítica",
      "Research de mercado y competidores (Yecla y comarca + referentes del sector)",
      "Mapa de contenidos y arquitectura propuesta (si aplica)",
      "Plan de medición (eventos, conversiones, Consent Mode v2)"
    ],
    deliverables: [
      "Documento de estrategia (1–2 páginas claras)",
      "Árbol de navegación y esquema de páginas/landings",
      "Lista priorizada de oportunidades (impacto vs esfuerzo)"
    ],
    criteria: [
      "Objetivos SMART definidos",
      "Aprobación de arquitectura y prioridades",
      "Brief cerrado y accesos (hosting/CMS/Analytics) si procede"
    ],
    tools: "Brief, Search Console/GA4 (si hay), Lighthouse, Screaming Frog, hojas de cálculo",
    kpi: "Lista de hipótesis y backlog priorizado (v1)"
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Diseño",
    subtitle: "UX/UI que convierte",
    description: "Creamos wireframes y prototipos que definen una experiencia clara y orientada a conversión.",
    duration: "4–7 días",
    tasks: [
      "Wireframes low-fi (estructura, jerarquía y CTAs)",
      "Prototipo visual (look & feel, componentes, estados)",
      "Copy base orientado a beneficios, objeciones y prueba social",
      "Preparación de assets (iconos, imágenes, estilos)"
    ],
    deliverables: [
      "Prototipo navegable (mobile/desktop)",
      "Guía breve de componentes y estilos",
      "Copy inicial por sección (titulares, subtítulos, CTAs)"
    ],
    criteria: [
      "Aprobación del prototipo y copy clave",
      "Componentes críticos definidos (cards, formularios, tablas de precios)"
    ],
    tools: "Figma/Adobe XD, biblioteca de componentes, banco de imágenes",
    kpi: "Tasa de comprensión en test de 5 segundos (interno) ≥ 80%"
  },
  {
    number: "03",
    icon: Code2,
    title: "Desarrollo",
    subtitle: "Código limpio y escalable",
    description: "Construimos tu proyecto con buenas prácticas, rendimiento y medición listos desde el día uno.",
    duration: "1–3 semanas (según número de páginas/funciones)",
    tasks: [
      "Maquetación semántica (HTML5/ARIA) y Tailwind/tema ligero (si WP)",
      "Integración CMS o headless (según alcance)",
      "SEO on-page técnico: titles, metas, schema, breadcrumbs, canónicos",
      "Core Web Vitals: imágenes (WebP/AVIF), lazy, fuentes swap",
      "Formularios con validación + eventos GA4 (generate_lead, contact_click)",
      "Consent Mode v2 y CMP compatibles RGPD"
    ],
    deliverables: [
      "Sitio funcional en entorno de pruebas (staging)",
      "Receta GTM/GA4 (nombres de eventos, triggers y conversiones)",
      "Documentación corta de uso/edición"
    ],
    criteria: [
      "Lighthouse móvil: Performance/SEO/Accesibilidad ≥ 90 (staging)",
      "Validación de datos estructurados sin errores críticos",
      "Tracking funcionando con consentimiento denied por defecto"
    ],
    tools: "VS Code, Git, WordPress/Next.js, GTM, GA4, Tag Assistant",
    kpi: "LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 en páginas clave"
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lanzamiento",
    subtitle: "Publicación & Optimización",
    description: "Desplegamos, optimizamos y te acompañamos en el crecimiento continuo.",
    duration: "2–4 días",
    tasks: [
      "Plan de publicación (DNS/hosting/SSL) y checklist de go-live",
      "Redirecciones 301 (si hay migración), verificación Search Console",
      "Configuración final de Analytics/Ads y objetivos",
      "Monitor de errores, core vitals y eventos de conversión",
      "Ajustes rápidos post-lanzamiento (copy, CTAs, velocidad)"
    ],
    deliverables: [
      "Sitio en producción con certificados activos",
      "Informe de lanzamiento (qué se publicó, métricas iniciales)",
      "Calendario de micro-mejoras 30/60/90 días"
    ],
    criteria: [
      "Indexación correcta de páginas clave",
      "Conversiones recogidas en GA4 y, si aplica, en Google Ads/Meta",
      "Cero errores 4xx/5xx en navegación principal"
    ],
    tools: "Panel de hosting, Search Console, PageSpeed, Tag Assistant",
    kpi: "100% navegación principal sin errores · conversiones registradas"
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Crecimiento",
    subtitle: "SEO & Ads en ciclo de mejora",
    description: "Iteramos con datos reales: contenidos, SEO local, tests A/B y optimización de campañas.",
    duration: "Mensual (revisión cada 4 semanas)",
    tasks: [
      "Roadmap mensual SEO (on-page, contenidos locales, enlaces citacionales)",
      "Mantenimiento y mejoras de rendimiento",
      "Campañas Google & Meta orientadas a CPA/ROAS con tests en landings",
      "Informes claros con próximos pasos y priorización"
    ],
    deliverables: [
      "Informe mensual con resultados y tareas",
      "Nuevos contenidos/landing tests (según plan)",
      "Ajustes técnicos continuos (seguridad y velocidad)"
    ],
    criteria: [
      "Objetivos mensuales cumplidos o plan de acción correctivo",
      "Backlog actualizado con impacto/esfuerzo y fechas"
    ],
    tools: "Search Console, GA4, Google Ads, Meta Business Suite",
    kpi: "Leads cualificados, CPA/ROAS, visibilidad local (GBR), CWV sostenidos",
    optional: true
  },
];

const faqs = [
  {
    question: "¿Qué necesitas de mí?",
    answer: "Aprobaciones rápidas y material de marca (logo, fotos), más acceso a Analytics/hosting si aplica."
  },
  {
    question: "¿Hay permanencia?",
    answer: "No. En crecimiento, mes a mes."
  },
  {
    question: "¿Garantizáis rankings?",
    answer: "Garantizamos ejecución excelente y mejora de KPIs; los rankings dependen del mercado y la competencia."
  }
];

export default function ProcessTimeline() {
  return (
    <section id="proceso" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-sm text-primary mb-4">// Metodología</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Nuestro proceso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un enfoque estructurado que garantiza resultados excepcionales en cada proyecto
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{step.number}</span>
                          {step.optional && (
                            <Badge variant="outline" className="text-xs">Opcional</Badge>
                          )}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-primary font-medium mb-3">{step.subtitle}</p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                        Ver detalles completos
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <div>
                            <h4 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                              <Wrench className="w-5 h-5 text-primary" />
                              Qué hacemos
                            </h4>
                            <ul className="space-y-2">
                              {step.tasks.map((task, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h4 className="font-display text-lg font-bold mb-3">Entregables</h4>
                              <ul className="space-y-2">
                                {step.deliverables.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-display text-lg font-bold mb-3">Criterios de "hecho"</h4>
                              <ul className="space-y-2">
                                {step.criteria.map((criterion, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>{criterion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-mono text-muted-foreground mb-1">Herramientas</p>
                            <p className="text-sm">{step.tools}</p>
                          </div>
                          <div>
                            <p className="text-xs font-mono text-muted-foreground mb-1">KPI de salida</p>
                            <p className="text-sm font-medium text-primary">{step.kpi}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            Preguntas frecuentes
          </h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-display text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center bg-gradient-to-br from-primary/10 to-background p-12 rounded-lg"
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Solicita tu propuesta con plazos y precio cerrados en 24 h
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" data-testid="button-pide-presupuesto-proceso">
                Pide presupuesto
              </Button>
            </Link>
            <Link href="/analiza-tu-web">
              <Button size="lg" variant="outline" data-testid="button-analiza-tu-web-proceso">
                Analiza tu web ahora
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
