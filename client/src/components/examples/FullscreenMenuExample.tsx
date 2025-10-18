import { useState } from "react";
import FullscreenMenu from "../FullscreenMenu";
import { Button } from "@/components/ui/button";

export default function FullscreenMenuExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Button onClick={() => setIsOpen(!isOpen)} className="m-8">
        {isOpen ? "Cerrar" : "Abrir"} Menú
      </Button>
      <FullscreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
