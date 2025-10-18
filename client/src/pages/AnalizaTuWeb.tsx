import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, User, Mail, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AnalizaTuWeb() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      website: formData.get("website"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Solicitud enviada!",
        description: "Analizaremos tu web y te enviaremos el informe completo por email.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Analiza tu Web
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre oportunidades de mejora SEO para tu sitio web. Te enviaremos un análisis completo con recomendaciones personalizadas.
            </p>
          </div>

          {/* Features */}
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
                Resultados en menos de 24 horas
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

          {/* Form */}
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
                    data-testid="input-email"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  data-testid="button-submit"
                  className="px-12 py-6 text-lg"
                >
                  {isSubmitting ? "Procesando..." : "Analizar mi web"}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Al enviar este formulario, aceptas nuestra política de privacidad
              </p>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-xl font-bold mb-4">
              ¿Qué incluye el análisis?
            </h3>
            <ul className="text-muted-foreground space-y-2 max-w-2xl mx-auto">
              <li>✓ Análisis técnico SEO completo</li>
              <li>✓ Evaluación de velocidad de carga</li>
              <li>✓ Revisión de metadatos y estructura</li>
              <li>✓ Análisis de contenido y palabras clave</li>
              <li>✓ Recomendaciones priorizadas</li>
              <li>✓ Consulta gratuita de 15 minutos</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
