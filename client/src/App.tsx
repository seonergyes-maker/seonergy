import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FullscreenMenu from "@/components/FullscreenMenu";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Home from "@/pages/Home";
import Servicios from "@/pages/Servicios";
import Proyectos from "@/pages/Proyectos";
import Proceso from "@/pages/Proceso";
import Contacto from "@/pages/Contacto";
import AnalizaTuWeb from "@/pages/AnalizaTuWeb";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";
import TerminosUso from "@/pages/TerminosUso";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/servicios" component={Servicios} />
        <Route path="/proyectos" component={Proyectos} />
        <Route path="/proceso" component={Proceso} />
        <Route path="/contacto" component={Contacto} />
        <Route path="/analiza-tu-web" component={AnalizaTuWeb} />
        <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
        <Route path="/terminos-uso" component={TerminosUso} />
        <Route component={NotFound} />
      </Switch>

      <Footer />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
