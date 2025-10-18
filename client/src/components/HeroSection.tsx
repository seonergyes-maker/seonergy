import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3129595/3129595-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
            <Link href="/contacto">
              <Button
                size="lg"
                className="min-h-12 px-8 text-base"
                data-testid="button-cta-hero"
              >
                Comenzar Proyecto
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/proyectos">
              <Button
                size="lg"
                variant="outline"
                className="min-h-12 px-8 text-base bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                data-testid="button-ver-proyectos"
              >
                Ver Proyectos
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
