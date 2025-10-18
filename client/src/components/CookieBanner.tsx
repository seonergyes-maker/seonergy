import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Link } from "wouter";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-bold mb-2">
                Este sitio utiliza cookies
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio. 
                Al hacer clic en "Aceptar", consientes el uso de todas las cookies.{" "}
                <Link href="/politica-privacidad">
                  <span className="text-primary hover:underline cursor-pointer">
                    Más información
                  </span>
                </Link>
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              data-testid="button-reject-cookies"
              className="flex-1 md:flex-none"
            >
              Rechazar
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              data-testid="button-accept-cookies"
              className="flex-1 md:flex-none"
            >
              Aceptar
            </Button>
          </div>

          <button
            onClick={rejectCookies}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar"
            data-testid="button-close-cookies"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
