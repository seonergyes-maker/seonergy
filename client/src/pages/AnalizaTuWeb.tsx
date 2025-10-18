import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, User, Mail, Search, Code, TrendingUp, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ScoreCard from "@/components/seo/ScoreCard";
import CategorySection from "@/components/seo/CategorySection";

// Datos de ejemplo para mostrar el diseño
const mockAnalysisData = {
  website: "https://ejemplo.com",
  scores: {
    technical: { current: 12, max: 20 },
    analytics: { current: 6, max: 12 },
    legal: { current: 1, max: 3 },
  },
  categories: [
    {
      title: "SEO Técnico",
      description: "Rastreo, indexación, arquitectura, rendimiento y estructura del sitio",
      icon: <Code className="w-6 h-6" />,
      subcategories: [
        {
          title: "Rastreo e indexación",
          checks: [
            {
              title: "Páginas indexadas en Google",
              message: "Google solo tiene indexadas 3 de las 47 páginas de tu sitio. Hay un problema grave de indexación.",
              status: "error" as const,
              solution: "Verifica en Search Console los errores de rastreo, revisa robots.txt y asegúrate de que las páginas no tengan noindex. Envía el sitemap y solicita reindexación.",
            },
            {
              title: "robots.txt",
              message: "No hemos encontrado tu archivo robots.txt. Los buscadores no tienen instrucciones de rastreo.",
              status: "error" as const,
              solution: "Crea un archivo robots.txt en la raíz de tu dominio con las directivas básicas de rastreo.",
            },
            {
              title: "Sitemap XML",
              message: "No has publicado un sitemap XML. Google tardará más en descubrir tus páginas.",
              status: "error" as const,
              solution: "Genera un sitemap.xml y súbelo a Search Console.",
            },
            {
              title: "Canónicos",
              message: "Detectamos canónicos relativos en lugar de absolutos. Usa URLs completas (https://...).",
              status: "warning" as const,
              solution: "Cambia todas las etiquetas canonical a URLs absolutas.",
            },
          ],
        },
        {
          title: "Arquitectura y URLs",
          checks: [
            {
              title: "Estructura de URLs",
              message: "Slugs largos o con parámetros innecesarios. Simplifícalos y hazlos legibles.",
              status: "warning" as const,
              solution: "Revisa y simplifica las URLs, eliminando parámetros innecesarios.",
            },
          ],
        },
        {
          title: "HTML semántico y metadatos",
          checks: [
            {
              title: "Títulos & Metadescripciones",
              message: "Páginas sin title único. Es básico para posicionar.",
              status: "error" as const,
              solution: "Asigna títulos únicos y descriptivos a cada página (50-60 caracteres).",
            },
            {
              title: "Encabezados",
              message: "Hay páginas con más de un H1 o sin H1. Define un único H1 por página.",
              status: "warning" as const,
            },
          ],
        },
        {
          title: "Datos estructurados (Schema)",
          checks: [
            {
              title: "Marcado de negocio",
              message: "No detectamos Schema de negocio local. Añade LocalBusiness con dirección y teléfono.",
              status: "error" as const,
              solution: "Implementa Schema.org LocalBusiness con tus datos NAP.",
            },
          ],
        },
        {
          title: "Rendimiento & Core Web Vitals",
          checks: [
            {
              title: "Velocidad en móvil",
              message: "Tu LCP supera 2,5 s en móvil. Optimiza imágenes y carga crítica.",
              status: "error" as const,
              solution: "Optimiza imágenes (WebP/AVIF), implementa lazy loading y mejora el servidor.",
            },
            {
              title: "Carga de recursos",
              message: "Demasiados scripts bloqueando el render. Diféralos o elimínalos.",
              status: "warning" as const,
            },
          ],
        },
      ],
    },
    {
      title: "Analytics, Tracking & Consentimiento",
      description: "Google Analytics, Tag Manager, eventos de conversión y RGPD",
      icon: <TrendingUp className="w-6 h-6" />,
      subcategories: [
        {
          title: "Consentimiento (CMP + Consent Mode v2)",
          checks: [
            {
              title: "Banner de cookies",
              message: "No detectamos un banner de consentimiento (CMP). Es obligatorio antes de cargar cookies no esenciales.",
              status: "error" as const,
              solution: "Implementa un CMP que cumpla con RGPD y configure Consent Mode v2.",
            },
            {
              title: "Estados de consentimiento",
              message: "Etiquetas de análisis/marketing cargan sin consentimiento. Incumple el RGPD.",
              status: "error" as const,
            },
          ],
        },
        {
          title: "Google Tag Manager",
          checks: [
            {
              title: "Estructura de contenedor",
              message: "No hemos encontrado GTM o está mal implementado. Centraliza el etiquetado para evitar duplicados.",
              status: "warning" as const,
              solution: "Instala GTM y migra todas tus etiquetas al contenedor.",
            },
          ],
        },
        {
          title: "Google Analytics 4",
          checks: [
            {
              title: "Implementación base",
              message: "GA4 no está instalado o no registra visitas. No podrás medir resultados.",
              status: "error" as const,
              solution: "Configura GA4 con tu ID de medición y verifica que page_view se dispara.",
            },
            {
              title: "Conversiones",
              message: "Tus eventos de conversión (leads) no están configurados. No medimos oportunidades reales.",
              status: "error" as const,
            },
          ],
        },
      ],
    },
    {
      title: "Legales (RGPD) relacionados con Tracking",
      description: "Políticas de privacidad, cookies y cumplimiento legal",
      icon: <FileText className="w-6 h-6" />,
      subcategories: [
        {
          title: "Páginas y cláusulas",
          checks: [
            {
              title: "Política de cookies y privacidad",
              message: "Falta Política de cookies o Privacidad actualizada. Requisito legal en España.",
              status: "error" as const,
              solution: "Crea páginas de Política de Privacidad y Política de Cookies actualizadas al RGPD.",
            },
          ],
        },
      ],
    },
  ],
};

export default function AnalizaTuWeb() {
  const [, setLocation] = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    website: "",
    name: "",
    email: "",
  });

  // Check if there's a hash in the URL
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setCurrentAnalysisId(hash);
    }
  }, []);

  // Load analysis if ID exists
  const { data: loadedAnalysis, isLoading: isLoadingAnalysis } = useQuery<any>({
    queryKey: ['/api/seo-analysis', currentAnalysisId],
    enabled: !!currentAnalysisId && !showResults,
  });

  useEffect(() => {
    if (loadedAnalysis && !showResults) {
      setShowResults(true);
      setFormData({
        website: loadedAnalysis.website,
        name: loadedAnalysis.name,
        email: loadedAnalysis.email,
      });
    }
  }, [loadedAnalysis, showResults]);

  // Save analysis mutation
  const saveAnalysisMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/seo-analysis', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to save analysis');
      return await res.json();
    },
    onSuccess: (data: any) => {
      setCurrentAnalysisId(data.uniqueId);
      window.location.hash = data.uniqueId;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simular análisis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate unique ID
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Save to database
    await saveAnalysisMutation.mutateAsync({
      uniqueId,
      website: formData.website,
      name: formData.name,
      email: formData.email,
      results: JSON.stringify(mockAnalysisData),
    });
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setCurrentAnalysisId(null);
    setFormData({ website: "", name: "", email: "" });
    window.location.hash = "";
  };

  const totalScore = mockAnalysisData.scores.technical.current + 
                     mockAnalysisData.scores.analytics.current + 
                     mockAnalysisData.scores.legal.current;
  const maxTotalScore = mockAnalysisData.scores.technical.max + 
                        mockAnalysisData.scores.analytics.max + 
                        mockAnalysisData.scores.legal.max;

  return (
    <div className="pt-20 min-h-screen">
      <AnimatePresence mode="wait">
        {/* Estado: Analizando */}
        {isAnalyzing && (
          <motion.section
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-5rem)]"
          >
            <div className="text-center max-w-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8"
              >
                <Loader2 className="w-full h-full text-primary" />
              </motion.div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Analizando tu sitio web
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Estamos revisando <span className="text-primary font-semibold">{formData.website}</span>
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  ✓ Verificando rastreo e indexación...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
                >
                  ✓ Analizando rendimiento...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
                >
                  ✓ Evaluando analytics y tracking...
                </motion.p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Estado: Resultados */}
        {!isAnalyzing && showResults && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="mb-6"
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Analizar otra web
                </Button>

                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      Resultados del análisis SEO
                    </h1>
                    <p className="text-lg text-muted-foreground flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      {mockAnalysisData.website}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-display font-bold text-primary">
                      {Math.round((totalScore / maxTotalScore) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Puntuación global</p>
                  </div>
                </div>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <ScoreCard
                  title="SEO Técnico"
                  score={mockAnalysisData.scores.technical.current}
                  maxScore={mockAnalysisData.scores.technical.max}
                  icon={<Code className="w-6 h-6" />}
                />
                <ScoreCard
                  title="Analytics & Tracking"
                  score={mockAnalysisData.scores.analytics.current}
                  maxScore={mockAnalysisData.scores.analytics.max}
                  icon={<TrendingUp className="w-6 h-6" />}
                />
                <ScoreCard
                  title="Legales (RGPD)"
                  score={mockAnalysisData.scores.legal.current}
                  maxScore={mockAnalysisData.scores.legal.max}
                  icon={<FileText className="w-6 h-6" />}
                />
              </div>

              {/* Priority Actions */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6 mb-12">
                <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  Acciones prioritarias
                </h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">1.</span>
                    <span>Resolver problema de indexación: solo 3 de 47 páginas están en Google</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">2.</span>
                    <span>Crear archivo robots.txt y sitemap.xml</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">3.</span>
                    <span>Implementar banner de consentimiento de cookies (RGPD)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">4.</span>
                    <span>Instalar Google Analytics 4 y configurar eventos de conversión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">5.</span>
                    <span>Optimizar velocidad de carga (Core Web Vitals)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">6.</span>
                    <span>Añadir Schema LocalBusiness para negocio local</span>
                  </li>
                </ul>
              </div>

              {/* Category Sections */}
              <div className="space-y-6">
                {mockAnalysisData.categories.map((category, idx) => (
                  <CategorySection
                    key={idx}
                    title={category.title}
                    description={category.description}
                    icon={category.icon}
                    subcategories={category.subcategories}
                    defaultOpen={idx === 0}
                  />
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  ¿Necesitas ayuda para mejorar tu SEO?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Nuestro equipo puede ayudarte a resolver estos problemas y llevar tu web al siguiente nivel.
                </p>
                <Button size="lg" data-testid="button-contact-cta">
                  Solicitar consultoría gratuita
                </Button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Estado: Formulario inicial */}
        {!isAnalyzing && !showResults && (
          <motion.section
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Analiza tu Web
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Descubre oportunidades de mejora SEO para tu sitio web. Recibirás un análisis completo con recomendaciones personalizadas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold mb-2">Análisis Completo</h3>
                  <p className="text-sm text-muted-foreground">
                    Evaluamos más de 50 factores SEO
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold mb-2">Rápido y Gratuito</h3>
                  <p className="text-sm text-muted-foreground">
                    Resultados instantáneos
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold mb-2">Informe Detallado</h3>
                  <p className="text-sm text-muted-foreground">
                    Recomendaciones accionables
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-b from-card to-background border border-border rounded-2xl p-8 md:p-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                  Solicita tu análisis gratuito
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      URL de tu sitio web
                    </label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://tuweb.com"
                      required
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      data-testid="input-website"
                      className="h-12"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        data-testid="input-name"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      data-testid="button-submit"
                      className="px-12 py-6 text-lg"
                    >
                      Analizar mi web
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Al enviar este formulario, aceptas nuestra política de privacidad
                  </p>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
