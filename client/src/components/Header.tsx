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
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-primary">Se</span>
            <span className="text-foreground">onergy</span>
          </span>
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
