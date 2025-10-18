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
import Admin from "@/pages/Admin";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";
import TerminosUso from "@/pages/TerminosUso";
import DisenoWeb from "@/pages/services/DisenoWeb";
import DesarrolloWeb from "@/pages/services/DesarrolloWeb";
import SEOEstrategico from "@/pages/services/SEOEstrategico";
import MarketingAds from "@/pages/services/MarketingAds";
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
        <Route path="/servicios/diseno-web" component={DisenoWeb} />
        <Route path="/servicios/desarrollo-web" component={DesarrolloWeb} />
        <Route path="/servicios/seo-estrategico" component={SEOEstrategico} />
        <Route path="/servicios/marketing-ads" component={MarketingAds} />
        <Route path="/proyectos" component={Proyectos} />
        <Route path="/proceso" component={Proceso} />
        <Route path="/contacto" component={Contacto} />
        <Route path="/analiza-tu-web" component={AnalizaTuWeb} />
        <Route path="/admin" component={Admin} />
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
