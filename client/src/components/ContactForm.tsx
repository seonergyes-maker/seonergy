import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hablemos de tu proyecto
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te ayudaremos a hacer realidad tu visión digital
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Mensaje
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Cuéntanos sobre tu proyecto..."
              required
              data-testid="input-message"
              className="min-h-[150px] resize-none"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              data-testid="button-submit"
              className="px-8 py-6 text-lg"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </div>
        </form>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>También puedes contactarnos directamente:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:hola@seonergy.es"
              className="hover:text-primary transition-colors"
            >
              hola@seonergy.es
            </a>
            <a
              href="https://wa.me/34604839262"
              className="hover:text-primary transition-colors"
            >
              +34 604 83 92 62
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
