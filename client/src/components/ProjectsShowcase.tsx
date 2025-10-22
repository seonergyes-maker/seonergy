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
          <p className="font-mono text-sm text-primary mb-4" data-testid="text-portfolio-label">// Portfolio</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-portfolio-title">
            Proyectos destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-project-${project.id}`}
              >
                <div className="group relative overflow-hidden rounded-lg hover-elevate active-elevate-2 cursor-pointer h-[400px]">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-testid={`img-project-${project.id}`}
                    />
                  </div>
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="font-mono text-xs text-primary mb-2" data-testid={`badge-category-${project.id}`}>
                      {project.category}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3" data-testid={`text-title-${project.id}`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed mb-4" data-testid={`text-description-${project.id}`}>
                      {project.description}
                    </p>
                    
                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors w-fit"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`link-view-project-${project.id}`}
                      >
                        <span className="text-sm font-medium">Ver proyecto</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Hover effect - lighter overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
