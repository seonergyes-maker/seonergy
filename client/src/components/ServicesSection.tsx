import { motion } from "framer-motion";
import { Code, TrendingUp, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Palette,
    title: "Diseño Web",
    description: "Creamos experiencias visuales únicas que cautivan y convierten. Interfaces modernas, responsive y centradas en el usuario.",
    features: ["UI/UX Design", "Responsive", "Branding"],
  },
  {
    icon: TrendingUp,
    title: "SEO Estratégico",
    description: "Posicionamiento orgánico que genera resultados reales. Estrategias data-driven para maximizar tu visibilidad online.",
    features: ["SEO On-Page", "Link Building", "Analytics"],
  },
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Código limpio, escalable y de alto rendimiento. Tecnologías modernas para aplicaciones web robustas y rápidas.",
    features: ["React/Next.js", "Node.js", "APIs REST"],
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-4">// Servicios</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Lo que hacemos mejor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos creatividad, tecnología y estrategia para llevar tu negocio al siguiente nivel digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="font-mono text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
