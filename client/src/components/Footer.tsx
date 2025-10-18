import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 183.97 28.11"
                className="w-auto h-8"
                role="img"
                aria-labelledby="seonergyTitle"
              >
                <title id="seonergyTitle">SEOnergy Logo</title>
                <g id="Capa_2" data-name="Capa 2">
                  <g id="Capa_2-2" data-name="Capa 2">
                    <polygon
                      fill="#fdc408"
                      points="14.05 5.07 17.28 8.29 11.52 14.05 14.05 16.59 22.88 7.76 22.88 7.76 25.57 5.07 31.33 10.83 33.87 8.3 25.57 0 19.81 5.76 14.05 0 0 14.05 2.54 16.59 5.07 14.05 5.07 14.05 14.05 5.07"
                    />
                    <polygon
                      fill="#fdc408"
                      points="37.09 11.52 34.55 14.05 34.55 14.05 25.57 23.03 22.35 19.81 28.11 14.05 25.57 11.52 23.03 14.05 23.03 14.05 19.81 17.27 19.81 17.27 17.28 19.81 17.28 19.81 14.05 23.03 8.29 17.28 5.76 19.81 14.05 28.11 19.81 22.35 25.57 28.11 39.62 14.05 37.09 11.52"
                    />
                    <path
                      fill="#fff"
                      d="M54.57,9.43a5.2,5.2,0,0,0-4.32-2c-2.55,0-3.77,1.06-3.77,2.42,0,1.58,1.87,2,4.06,2.28,3.79.47,7.33,1.46,7.33,5.8,0,4.06-3.59,5.8-7.65,5.8-3.71,0-6.57-1.14-7.93-4.47l2.86-1.49c.81,2,2.92,2.89,5.13,2.89s4.18-.75,4.18-2.73c0-1.71-1.79-2.42-4.21-2.68-3.72-.44-7.15-1.43-7.15-5.51,0-3.74,3.69-5.28,7-5.3,2.83,0,5.77.8,7.15,3.61Z"
                    />
                    <path
                      fill="#fff"
                      d="M74.09,23.23H60.47V5H74.09V8.36H63.87v4.18h9.86v3.2H63.87v4.11H74.09Z"
                    />
                    <path
                      fill="#fff"
                      d="M94.63,14.24c0,4.7-2.93,9.41-9.33,9.41S75.94,19,75.94,14.26,79,4.67,85.3,4.67,94.69,9.48,94.63,14.24Zm-15.31.07c.08,3,1.69,6.19,6,6.19s5.9-3.22,6-6.21-1.66-6.5-6-6.5S79.24,11.24,79.32,14.31Z"
                    />
                    <path
                      fill="#fff"
                      d="M109.11,5h3.44V23.23h-2.14v0L100.85,11V23.23H97.41V5h2.79l8.91,11.29Z"
                    />
                    <path
                      fill="#fff"
                      d="M129.27,23.23H115.64V5h13.63V8.36H119.05v4.18h9.85v3.2h-9.85v4.11h10.22Z"
                    />
                    <path
                      fill="#fff"
                      d="M148.06,23.23H144l-5.3-6.08h-3.31v6.08h-3.43V5l8.66,0c4.29,0,6.55,2.89,6.55,6a5.39,5.39,0,0,1-4.6,5.72L148.06,23Zm-12.69-15v5.82h5.23a2.84,2.84,0,0,0,3.12-2.91,2.85,2.85,0,0,0-3.12-2.91Z"
                    />
                    <path
                      fill="#fff"
                      d="M163,9.48a7,7,0,0,0-4.63-1.82c-3.9,0-6.27,3-6.27,6.7,0,3,1.74,6.09,6.27,6.09A6,6,0,0,0,162.47,19V15.77h-4.66V12.7h7.8v7.67a9,9,0,0,1-7.25,3.28c-6.84,0-9.62-4.5-9.62-9.29,0-5.12,3.2-9.85,9.62-9.85a9.64,9.64,0,0,1,6.76,2.78Z"
                    />
                    <path
                      fill="#fff"
                      d="M175,12.54,179.83,5H184v.16l-7.26,10.53v7.51h-3.43V15.72l-7-10.53V5h4.08Z"
                    />
                  </g>
                </g>
              </svg>
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
                <a
                  href="#servicios"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Diseño Web
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SEO
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Desarrollo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#proyectos"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#proceso"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Proceso
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
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
                <a
                  href="mailto:hola@seonergy.es"
                  className="hover:text-foreground transition-colors"
                >
                  hola@seonergy.es
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+34900000000"
                  className="hover:text-foreground transition-colors"
                >
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
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
