import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="pt-20 p-8">
        <p className="text-muted-foreground">Scroll para ver el header fijo. Estado del menú: {isMenuOpen ? "Abierto" : "Cerrado"}</p>
      </div>
    </div>
  );
}
