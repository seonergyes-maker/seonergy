import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Lock, Mail, LogOut, ExternalLink, Calendar, User as UserIcon, Globe } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Login failed');
      return await res.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      setLoginError("");
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-analysis'] });
    },
    onError: () => {
      setLoginError("Credenciales incorrectas");
    },
  });

  // Fetch all analyses (only when authenticated)
  const { data: analyses = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/seo-analysis'],
    queryFn: async () => {
      const res = await fetch('/api/admin/seo-analysis', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch analyses');
      return await res.json();
    },
    enabled: isAuthenticated,
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginMutation.mutateAsync(credentials);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ email: "", password: "" });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Accede para ver todos los análisis SEO</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@seonergy.es"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                data-testid="input-admin-email"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                data-testid="input-admin-password"
                className="h-12"
              />
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-500">
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="button-admin-login"
            >
              {loginMutation.isPending ? "Verificando..." : "Iniciar sesión"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground">
                Todos los análisis SEO realizados
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total análisis</p>
                  <p className="text-3xl font-display font-bold">{analyses.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Esta semana</p>
                  <p className="text-3xl font-display font-bold">
                    {analyses.filter((a: any) => {
                      const date = new Date(a.createdAt);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return date > weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Usuarios únicos</p>
                  <p className="text-3xl font-display font-bold">
                    {new Set(analyses.map((a: any) => a.email)).size}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <UserIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Analyses list */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold mb-6">Análisis realizados</h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando análisis...</p>
              </div>
            ) : analyses.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No hay análisis realizados todavía</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {analyses.map((analysis: any) => (
                  <Card key={analysis.id} className="p-6 hover-elevate">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-bold text-lg truncate">
                            {analysis.website}
                          </h3>
                          <a
                            href={`/analiza-tu-web#${analysis.uniqueId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <Button size="sm" variant="ghost" data-testid={`button-view-${analysis.id}`}>
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <UserIcon className="w-4 h-4" />
                            <span className="truncate">{analysis.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span className="truncate">{analysis.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(analysis.createdAt), "dd 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-muted-foreground font-mono">
                          ID: {analysis.uniqueId}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
