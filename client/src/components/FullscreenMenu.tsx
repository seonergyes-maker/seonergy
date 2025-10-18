import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Inicio", href: "#hero", number: "01" },
  { label: "Servicios", href: "#servicios", number: "02" },
  { label: "Proyectos", href: "#proyectos", number: "03" },
  { label: "Proceso", href: "#proceso", number: "04" },
  { label: "Contacto", href: "#contacto", number: "05" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3 },
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="h-full w-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
            <nav className="w-full max-w-4xl">
              <ul className="space-y-4 md:space-y-6">
                {menuItems.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="group flex items-baseline gap-4 md:gap-8 w-full text-left hover-elevate active-elevate-2 py-2 px-4 -mx-4 rounded-md transition-all duration-300"
                      data-testid={`link-menu-${item.label.toLowerCase()}`}
                    >
                      <span className="font-mono text-sm md:text-base text-muted-foreground group-hover:text-primary transition-colors">
                        {item.number}
                      </span>
                      <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              variants={itemVariants}
              className="mt-auto mb-8 flex flex-col gap-4"
            >
              <p className="text-sm text-muted-foreground font-mono">Síguenos</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  data-testid="link-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                  data-testid="link-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hola@seonergy.es"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                  data-testid="link-email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
