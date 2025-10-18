import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-20">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-lg border-b border-border" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.97 28.11" className="w-auto h-8"><defs><style>{`.cls-1{fill:#fdc408;}.cls-2{fill:#fff;}`}</style></defs><title>SEOnergy Logo</title><g id="Capa_2" data-name="Capa 2"><g id="Capa_2-2" data-name="Capa 2"><polygon className="cls-1" points="14.05 5.07 17.28 8.29 11.52 14.05 14.05 16.59 22.88 7.76 22.88 7.76 25.57 5.07 31.33 10.83 33.87 8.3 25.57 0 19.81 5.76 14.05 0 0 14.05 2.54 16.59 5.07 14.05 5.07 14.05 14.05 5.07"></polygon><polygon className="cls-1" points="37.09 11.52 34.55 14.05 34.55 14.05 25.57 23.03 22.35 19.81 28.11 14.05 25.57 11.52 23.03 14.05 23.03 14.05 19.81 17.27 19.81 17.27 17.28 19.81 17.28 19.81 14.05 23.03 8.29 17.28 5.76 19.81 14.05 28.11 19.81 22.35 25.57 28.11 39.62 14.05 37.09 11.52"></polygon><path className="cls-2" d="M54.57,9.43a5.2,5.2,0,0,0-4.32-2c-2.55,0-3.77,1.06-3.77,2.42,0,1.58,1.87,2,4.06,2.28,3.79.47,7.33,1.46,7.33,5.8,0,4.06-3.59,5.8-7.65,5.8-3.71,0-6.57-1.14-7.93-4.47l2.86-1.49c.81,2,2.92,2.89,5.13,2.89s4.18-.75,4.18-2.73c0-1.71-1.79-2.42-4.21-2.68-3.72-.44-7.15-1.43-7.15-5.51,0-3.74,3.69-5.28,7-5.3,2.83,0,5.77.8,7.15,3.61Z"></path><path className="cls-2" d="M74.09,23.23H60.47V5H74.09V8.36H63.87v4.18h9.86v3.2H63.87v4.11H74.09Z"></path><path className="cls-2" d="M94.63,14.24c0,4.7-2.93,9.41-9.33,9.41S75.94,19,75.94,14.26,79,4.67,85.3,4.67,94.69,9.48,94.63,14.24Zm-15.31.07c.08,3,1.69,6.19,6,6.19s5.9-3.22,6-6.21-1.66-6.5-6-6.5S79.24,11.24,79.32,14.31Z"></path><path className="cls-2" d="M109.11,5h3.44V23.23h-2.14v0L100.85,11V23.23H97.41V5h2.79l8.91,11.29Z"></path><path className="cls-2" d="M129.27,23.23H115.64V5h13.63V8.36H119.05v4.18h9.85v3.2h-9.85v4.11h10.22Z"></path><path className="cls-2" d="M148.06,23.23H144l-5.3-6.08h-3.31v6.08h-3.43V5l8.66,0c4.29,0,6.55,2.89,6.55,6a5.39,5.39,0,0,1-4.6,5.72L148.06,23Zm-12.69-15v5.82h5.23a2.84,2.84,0,0,0,3.12-2.91,2.85,2.85,0,0,0-3.12-2.91Z"></path><path className="cls-2" d="M163,9.48a7,7,0,0,0-4.63-1.82c-3.9,0-6.27,3-6.27,6.7,0,3,1.74,6.09,6.27,6.09A6,6,0,0,0,162.47,19V15.77h-4.66V12.48h8.25v8.37a14.19,14.19,0,0,1-7.74,2.79c-6.35,0-9.82-4.27-9.82-9.37s3.47-9.6,9.82-9.6a9.66,9.66,0,0,1,7.52,3.12Z"></path><path className="cls-2" d="M183.33,10.29,175,23.23h-3.37L166,10.29h3.77L174,19.55l4.21-9.26Z"></path></g></g></svg>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={onMenuToggle}
          className="relative"
          data-testid="button-menu-toggle"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
        </Button>
      </div>
    </header>
  );
}
