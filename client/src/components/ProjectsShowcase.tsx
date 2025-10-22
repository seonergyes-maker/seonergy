import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function ProjectsShowcase() {
  const { data: projects = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section id="proyectos" className="py-20 md:py-32 bg-background">
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
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid mb-6"
                data-testid={`card-project-${project.id}`}
              >
                <div className="group relative overflow-hidden rounded-lg bg-card border border-border hover-elevate active-elevate-2 cursor-pointer transition-all duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      data-testid={`img-project-${project.id}`}
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary/90 text-primary-foreground backdrop-blur-sm font-mono text-xs" data-testid={`badge-category-${project.id}`}>
                        {project.category}
                      </Badge>
                    </div>

                    {/* Link button on hover */}
                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground transform group-hover:scale-100 scale-0"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`link-external-${project.id}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors" data-testid={`text-title-${project.id}`}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-description-${project.id}`}>
                      {project.description}
                    </p>
                    
                    {project.externalLink && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <a
                          href={project.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group/link"
                          onClick={(e) => e.stopPropagation()}
                          data-testid={`link-view-project-${project.id}`}
                        >
                          <span>Ver proyecto</span>
                          <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
