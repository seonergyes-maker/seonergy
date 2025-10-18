import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [antispamData, setAntispamData] = useState<{ token: string; timestamp: number } | null>(null);
  const { toast } = useToast();

  // Obtener token antispam al cargar el componente
  useEffect(() => {
    fetch('/api/contact/token')
      .then(res => res.json())
      .then(data => setAntispamData(data))
      .catch(err => console.error('Error getting antispam token:', err));
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Error al enviar');
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      // Obtener nuevo token
      fetch('/api/contact/token')
        .then(res => res.json())
        .then(data => setAntispamData(data));
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!antispamData) {
      toast({
        title: "Error",
        description: "Por favor recarga la página e intenta de nuevo.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      // Antispam data (invisible para el usuario)
      token: antispamData.token,
      timestamp: antispamData.timestamp,
      honeypot: formData.get("website") as string, // Campo trampa invisible
    };

    await contactMutation.mutateAsync(data);
    if (contactMutation.isSuccess) {
      (e.target as HTMLFormElement).reset();
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
            <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Teléfono (opcional)
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+34 600 00 00 00"
              data-testid="input-phone"
              className="h-12"
            />
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

          {/* Honeypot - Campo invisible para atrapar bots */}
          <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
            <label htmlFor="website">Website (dejar en blanco)</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={contactMutation.isPending || !antispamData}
              data-testid="button-submit"
              className="px-8 py-6 text-lg"
            >
              {contactMutation.isPending ? "Enviando..." : "Enviar mensaje"}
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
