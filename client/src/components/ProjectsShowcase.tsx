import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsShowcase() {
  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/projects'],
  });

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

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Cargando proyectos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No hay proyectos disponibles en este momento</p>
          </div>
        ) : (
          <>
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
                          src={project.imagePath}
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
                        {project.externalLink && (
                          <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-sm">Ver proyecto</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-2 h-2 rounded-full bg-muted"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
