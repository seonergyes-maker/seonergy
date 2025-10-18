import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Futuristic_tech_city_night_bbd8e114.png";

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.querySelector("#servicios");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img
          src={heroImage}
          alt="Futuristic cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-mono text-sm md:text-base text-chart-2 mb-6"
          >
            &lt; Agencia Digital /&gt;
          </motion.p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            Transformamos
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">
              Ideas en Digital
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Diseño web creativo, SEO estratégico y desarrollo de software que impulsa tu marca al siguiente nivel
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="min-h-12 px-8 text-base"
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-hero"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-12 px-8 text-base bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              onClick={() => document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-ver-proyectos"
            >
              Ver Proyectos
            </Button>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToNext}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
          data-testid="button-scroll-down"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
