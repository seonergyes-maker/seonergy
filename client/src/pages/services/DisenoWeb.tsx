import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Palette, Smartphone, TrendingUp, Zap } from "lucide-react";
import { Link } from "wouter";
import ServiceFAQ from "@/components/ServiceFAQ";
import { useEffect } from "react";

export default function DisenoWeb() {
  useEffect(() => {
    document.title = "Diseño web profesional para comercios | Seonergy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Webs rápidas y enfocadas a ventas. Diseño web para pymes y comercios: responsive, SEO on-page y lista para anunciar. Pide presupuesto.');
    }
  }, []);

  const faqs = [
    {
      question: "¿Trabajáis con WordPress?",
      answer: "Sí, trabajamos con WordPress usando temas ligeros y bloques optimizados. También podemos desarrollar sin CMS si el proyecto lo requiere para mayor rendimiento."
    },
    {
      question: "¿Incluye textos e imágenes?",
      answer: "Sí, incluimos copy base optimizado para conversión y selección de imágenes de stock libres de derechos. También podemos trabajar con tu contenido si lo prefieres."
    },
    {
      question: "¿Qué no incluye?",
      answer: "Alojamiento y dominio no están incluidos en el precio base, aunque podemos gestionarlos por ti sin problema."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <Badge variant="outline" className="mb-6 bg-white/10 backdrop-blur-md border-white/20 text-white">
              <Palette className="w-3 h-3 mr-2" />
              Diseño Web
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
              Diseño web que convierte visitas en clientes
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Sitios rápidos, claros y preparados para SEO y anuncios desde el día uno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" data-testid="button-pide-presupuesto">
                  Pide presupuesto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/proyectos">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20" data-testid="button-ver-ejemplos">
                  Ver ejemplos
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
              Para quién es
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <Smartphone className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">Comercios y servicios</h3>
              <p className="text-muted-foreground">
                que necesitan más llamadas y formularios de contacto a través de su web.
              </p>
            </Card>
            <Card className="p-8">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">Pymes</h3>
              <p className="text-muted-foreground">
                con webs desactualizadas que quieren subir en Google y mejorar su imagen de marca.
              </p>
            </Card>
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
              Qué entregamos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Diseño responsive (móvil primero) con Core Web Vitals optimizados",
              "Estructura de páginas: Home, Servicios, Sobre, Contacto, Legales",
              "Copy orientado a conversión (titulares, beneficios, CTAs)",
              "SEO on-page: títulos, metas, H1–H3, interlinking, schema básico",
              "Formularios con validación, clic a WhatsApp y teléfono",
              "Integración Analytics/GA4 + eventos de lead (form, tel, WhatsApp)",
              "Capacitación breve para que puedas editar contenidos",
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
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Proceso de trabajo
            </h2>
            <p className="text-lg text-muted-foreground">
              4 pasos claros • Plazo estimado: 3–4 semanas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Brief rápido", desc: "Entendemos tu negocio y objetivos" },
              { num: "02", title: "Wireframes", desc: "Propuesta visual y estructura" },
              { num: "03", title: "Desarrollo", desc: "Implementación y optimización" },
              { num: "04", title: "Lanzamiento", desc: "Publicación y medición" },
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">
                Más solicitudes y llamadas desde el móvil
              </h3>
            </Card>
            <Card className="p-8">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">
                Mejor rendimiento en Google y campañas de pago
              </h3>
            </Card>
          </div>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <p className="font-mono text-sm text-primary mb-2">Caso de éxito</p>
            <h3 className="font-display text-2xl font-bold mb-3">
              Centro Salud X
            </h3>
            <p className="text-lg text-muted-foreground">
              Nueva web + SEO on-page → <span className="text-primary font-bold">+62% clics a llamada</span> en 8 semanas
            </p>
          </Card>
        </div>
      </section>

      <ServiceFAQ faqs={faqs} />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para tu nueva web?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Cuéntanos tu proyecto y te enviaremos una propuesta personalizada
            </p>
            <Link href="/contacto">
              <Button size="lg" data-testid="button-quiero-mi-nueva-web">
                Quiero mi nueva web
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
