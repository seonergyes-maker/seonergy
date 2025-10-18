import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Investigación",
    description: "Analizamos tu negocio, audiencia y competencia para crear una estrategia sólida y efectiva.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Diseño",
    description: "Creamos wireframes y prototipos interactivos que definen la experiencia de usuario perfecta.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desarrollo",
    description: "Construimos tu proyecto con código limpio, escalable y las mejores prácticas del sector.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lanzamiento",
    description: "Desplegamos, optimizamos y te acompañamos en el crecimiento continuo de tu proyecto.",
  },
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

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="relative">
                    <span className="absolute -top-8 left-0 md:left-auto font-display text-8xl font-bold text-muted/10 select-none">
                      {step.number}
                    </span>
                    <div className="relative z-10">
                      <div className={`inline-flex w-16 h-16 rounded-md bg-primary/10 items-center justify-center mb-4 ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      }`}>
                        <step.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-16">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
