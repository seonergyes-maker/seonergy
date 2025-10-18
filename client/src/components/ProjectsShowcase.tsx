import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import project1 from "@assets/generated_images/Modern_web_design_mockup_49aca7c1.png";
import project2 from "@assets/generated_images/E-commerce_responsive_design_showcase_1fb20817.png";
import project3 from "@assets/generated_images/Mobile_app_UI_mockup_b86e07c9.png";

const projects = [
  {
    id: 1,
    title: "TechFlow Platform",
    category: "Diseño Web",
    image: project1,
    description: "Plataforma SaaS para gestión empresarial",
  },
  {
    id: 2,
    title: "Urban Store",
    category: "E-commerce",
    image: project2,
    description: "Tienda online responsive con experiencia premium",
  },
  {
    id: 3,
    title: "FitLife App",
    category: "Desarrollo Mobile",
    image: project3,
    description: "Aplicación de fitness con tracking inteligente",
  },
];

export default function ProjectsShowcase() {
  return (
    <section id="proyectos" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-4">// Portfolio</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Proyectos destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiencias digitales que han transformado negocios y marcas
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-8 w-max">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="snap-center"
              >
                <div className="group relative w-[85vw] md:w-[45vw] lg:w-[35vw] overflow-hidden rounded-md hover-elevate active-elevate-2 cursor-pointer">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="font-mono text-xs text-chart-2 mb-2">{project.category}</p>
                    <h3 className="font-display text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-sm">Ver proyecto</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
