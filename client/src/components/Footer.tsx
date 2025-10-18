import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img 
                src="/logo.svg" 
                alt="Seonergy" 
                className="h-7 w-auto"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Transformamos ideas en experiencias digitales extraordinarias.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="footer-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Diseño Web
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  SEO
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Desarrollo
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Branding
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a href="#proyectos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#proceso" className="text-muted-foreground hover:text-foreground transition-colors">
                  Proceso
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:hola@seonergy.es" className="hover:text-foreground transition-colors">
                  hola@seonergy.es
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+34900000000" className="hover:text-foreground transition-colors">
                  +34 900 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Seonergy. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
