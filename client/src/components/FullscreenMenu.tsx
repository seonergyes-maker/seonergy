import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Inicio", href: "#hero", number: "01", description: "Comienza aquí" },
  { label: "Servicios", href: "#servicios", number: "02", description: "Nuestras soluciones" },
  { label: "Proyectos", href: "#proyectos", number: "03", description: "Casos de éxito" },
  { label: "Proceso", href: "#proceso", number: "04", description: "Cómo trabajamos" },
  { label: "Contacto", href: "#contacto", number: "05", description: "Hablemos" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3 },
  },
};

const overlayVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-primary/5 origin-top"
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-full w-full flex flex-col lg:flex-row items-start justify-between px-6 py-24 md:px-12 lg:px-20 xl:px-32 gap-12">
              
              {/* Main Navigation */}
              <nav className="flex-1 w-full lg:w-auto">
                <motion.div
                  variants={itemVariants}
                  className="mb-8 lg:mb-12"
                >
                  <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
                    Navegación
                  </p>
                </motion.div>
                
                <ul className="space-y-2 md:space-y-3">
                  {menuItems.map((item, index) => (
                    <motion.li key={item.href} variants={itemVariants}>
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group relative flex items-center gap-3 md:gap-6 w-full text-left py-3 md:py-4 px-4 md:px-6 -mx-4 md:-mx-6 rounded-lg overflow-hidden transition-all duration-300"
                        data-testid={`link-menu-${item.label.toLowerCase()}`}
                      >
                        {/* Hover background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative flex items-center gap-3 md:gap-6 flex-1">
                          {/* Number */}
                          <span className="font-mono text-xs md:text-sm text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 min-w-[2rem]">
                            {item.number}
                          </span>
                          
                          {/* Label and description */}
                          <div className="flex-1">
                            <div className="font-display text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                              {item.label}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {item.description}
                            </div>
                          </div>
                          
                          {/* Arrow icon */}
                          <ArrowUpRight 
                            className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                          />
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Contact Info & Social */}
              <motion.div
                variants={itemVariants}
                className="lg:w-80 xl:w-96 space-y-8 md:space-y-12"
              >
                {/* Contact Info */}
                <div className="space-y-4">
                  <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
                    Contacto
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:hola@seonergy.es"
                      className="group flex items-center gap-2 text-lg md:text-xl text-foreground hover:text-primary transition-colors"
                      data-testid="link-email-menu"
                    >
                      <Mail className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                      <span className="font-medium">hola@seonergy.es</span>
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-wider uppercase">
                    Síguenos
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <a
                      href="#"
                      className="group flex items-center gap-2 px-4 py-2 rounded-md bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      aria-label="Instagram"
                      data-testid="link-instagram"
                    >
                      <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        Instagram
                      </span>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center gap-2 px-4 py-2 rounded-md bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      aria-label="LinkedIn"
                      data-testid="link-linkedin"
                    >
                      <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        LinkedIn
                      </span>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center gap-2 px-4 py-2 rounded-md bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      aria-label="Twitter"
                      data-testid="link-twitter"
                    >
                      <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        Twitter
                      </span>
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Creamos experiencias digitales que transforman marcas y conectan con las personas.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              variants={itemVariants}
              className="fixed bottom-6 left-6 md:bottom-8 md:left-12 lg:left-20 xl:left-32 font-mono text-xs text-muted-foreground/30"
            >
              © 2024 Seonergy
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
