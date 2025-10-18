import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Lock, Mail, LogOut, ExternalLink, Calendar, User as UserIcon, Globe, Check, Trash2, Filter, MessageSquare, Phone, Folder, Image, Plus, Edit, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [filter, setFilter] = useState<"all" | "contacted" | "not_contacted">("all");
  const [messageFilter, setMessageFilter] = useState<"all" | "nuevo" | "leído" | "respondido">("all");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    externalLink: "",
    displayOrder: 0,
    isActive: true,
  });
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  // Fetch all contact messages (only when authenticated)
  const { data: messages = [], isLoading: messagesLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/contact-messages'],
    queryFn: async () => {
      const res = await fetch('/api/admin/contact-messages', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch messages');
      return await res.json();
    },
    enabled: isAuthenticated,
  });

  // Fetch all projects (only when authenticated)
  const { data: projectsList = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ['/api/admin/projects'],
    queryFn: async () => {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch projects');
      return await res.json();
    },
    enabled: isAuthenticated,
  });

  // Mark as contacted mutation
  const markContactedMutation = useMutation({
    mutationFn: async ({ id, contacted }: { id: number; contacted: boolean }) => {
      const res = await fetch(`/api/admin/seo-analysis/${id}/contacted`, {
        method: 'PATCH',
        body: JSON.stringify({ ...credentials, contacted }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-analysis'] });
    },
  });

  // Delete analysis mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/seo-analysis/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/seo-analysis'] });
    },
  });

  // Update message status mutation
  const updateMessageStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/admin/contact-messages/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ ...credentials, status }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to update');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
    },
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/contact-messages/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
    },
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      
      const res = await fetch('/api/admin/projects/create', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create project');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/projects'] });
      resetProjectForm();
      setShowProjectForm(false);
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);
      
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update project');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/projects'] });
      resetProjectForm();
      setShowProjectForm(false);
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete');
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/projects'] });
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginMutation.mutateAsync(credentials);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ email: "", password: "" });
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      category: "",
      description: "",
      externalLink: "",
      displayOrder: 0,
      isActive: true,
    });
    setProjectImage(null);
    setImagePreview(null);
    setEditingProject(null);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      description: project.description,
      externalLink: project.externalLink || "",
      displayOrder: project.displayOrder,
      isActive: project.isActive === 1,
    });
    setImagePreview(project.imagePath);
    setShowProjectForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProjectImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('category', projectForm.category);
    formData.append('description', projectForm.description);
    formData.append('externalLink', projectForm.externalLink);
    formData.append('displayOrder', projectForm.displayOrder.toString());
    formData.append('isActive', projectForm.isActive ? '1' : '0');
    
    if (projectImage) {
      formData.append('image', projectImage);
    }

    if (editingProject) {
      await updateProjectMutation.mutateAsync({ id: editingProject.id, formData });
    } else {
      await createProjectMutation.mutateAsync(formData);
    }
  };

  // Filter analyses
  const filteredAnalyses = analyses.filter((analysis: any) => {
    if (filter === "contacted") return analysis.contacted === 1;
    if (filter === "not_contacted") return analysis.contacted === 0;
    return true;
  });

  // Filter messages
  const filteredMessages = messages.filter((message: any) => {
    if (messageFilter === "all") return true;
    return message.status === messageFilter;
  });

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
                Gestiona análisis SEO y mensajes de contacto
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>

          <Tabs defaultValue="analyses" className="w-full">
            <TabsList className="grid w-full max-w-2xl mb-8" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <TabsTrigger value="analyses" data-testid="tab-analyses">
                <Globe className="w-4 h-4 mr-2" />
                Análisis SEO ({analyses.length})
              </TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Mensajes ({messages.length})
              </TabsTrigger>
              <TabsTrigger value="projects" data-testid="tab-projects">
                <Folder className="w-4 h-4 mr-2" />
                Proyectos ({projectsList.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyses"  className="space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
                  <p className="text-sm text-muted-foreground mb-1">No contactados</p>
                  <p className="text-3xl font-display font-bold">
                    {analyses.filter((a: any) => a.contacted === 0).length}
                  </p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contactados</p>
                  <p className="text-3xl font-display font-bold">
                    {analyses.filter((a: any) => a.contacted === 1).length}
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Analyses list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-display text-2xl font-bold">Análisis realizados</h2>
              
              {/* Filters */}
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  data-testid="filter-all"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Todos ({analyses.length})
                </Button>
                <Button
                  variant={filter === "not_contacted" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("not_contacted")}
                  data-testid="filter-not-contacted"
                >
                  No contactados ({analyses.filter((a: any) => a.contacted === 0).length})
                </Button>
                <Button
                  variant={filter === "contacted" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("contacted")}
                  data-testid="filter-contacted"
                >
                  Contactados ({analyses.filter((a: any) => a.contacted === 1).length})
                </Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando análisis...</p>
              </div>
            ) : filteredAnalyses.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  {filter === "all" 
                    ? "No hay análisis realizados todavía" 
                    : `No hay análisis ${filter === "contacted" ? "contactados" : "sin contactar"}`
                  }
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredAnalyses.map((analysis: any) => (
                  <Card key={analysis.id} className="p-6 hover-elevate">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-display font-bold text-lg truncate">
                            {analysis.website}
                          </h3>
                          <Badge variant={analysis.contacted === 1 ? "default" : "secondary"} data-testid={`badge-status-${analysis.id}`}>
                            {analysis.contacted === 1 ? "Contactado" : "Sin contactar"}
                          </Badge>
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
                      
                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant={analysis.contacted === 1 ? "outline" : "default"}
                          onClick={() => markContactedMutation.mutate({ 
                            id: analysis.id, 
                            contacted: analysis.contacted === 1 ? false : true 
                          })}
                          disabled={markContactedMutation.isPending}
                          data-testid={`button-toggle-contacted-${analysis.id}`}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {analysis.contacted === 1 ? "Desmarcar" : "Marcar contactado"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm(`¿Eliminar análisis de ${analysis.website}?`)) {
                              deleteMutation.mutate(analysis.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                          data-testid={`button-delete-${analysis.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-8">
              {/* Stats for messages */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total mensajes</p>
                      <p className="text-3xl font-display font-bold">{messages.length}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Nuevos</p>
                      <p className="text-3xl font-display font-bold">
                        {messages.filter((m: any) => m.status === 'nuevo').length}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Mail className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Leídos</p>
                      <p className="text-3xl font-display font-bold">
                        {messages.filter((m: any) => m.status === 'leído').length}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Check className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Respondidos</p>
                      <p className="text-3xl font-display font-bold">
                        {messages.filter((m: any) => m.status === 'respondido').length}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Messages list */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h2 className="font-display text-2xl font-bold">Mensajes recibidos</h2>
                  
                  {/* Filters */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={messageFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMessageFilter("all")}
                      data-testid="filter-messages-all"
                    >
                      Todos ({messages.length})
                    </Button>
                    <Button
                      variant={messageFilter === "nuevo" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMessageFilter("nuevo")}
                      data-testid="filter-messages-nuevo"
                    >
                      Nuevos ({messages.filter((m: any) => m.status === 'nuevo').length})
                    </Button>
                    <Button
                      variant={messageFilter === "leído" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMessageFilter("leído")}
                      data-testid="filter-messages-leido"
                    >
                      Leídos ({messages.filter((m: any) => m.status === 'leído').length})
                    </Button>
                    <Button
                      variant={messageFilter === "respondido" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMessageFilter("respondido")}
                      data-testid="filter-messages-respondido"
                    >
                      Respondidos ({messages.filter((m: any) => m.status === 'respondido').length})
                    </Button>
                  </div>
                </div>
                
                {messagesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Cargando mensajes...</p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">
                      {messageFilter === "all" 
                        ? "No hay mensajes todavía" 
                        : `No hay mensajes con estado "${messageFilter}"`
                      }
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.map((message: any) => (
                      <Card key={message.id} className="p-6 hover-elevate">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="font-display font-bold text-lg">
                                {message.name}
                              </h3>
                              <Badge 
                                variant={
                                  message.status === 'respondido' ? 'default' : 
                                  message.status === 'leído' ? 'secondary' : 
                                  'outline'
                                }
                                data-testid={`badge-message-status-${message.id}`}
                              >
                                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <a href={`mailto:${message.email}`} className="hover:text-primary transition-colors truncate">
                                  {message.email}
                                </a>
                              </div>
                              {message.phone && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Phone className="w-4 h-4" />
                                  <a href={`tel:${message.phone}`} className="hover:text-primary transition-colors">
                                    {message.phone}
                                  </a>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {format(new Date(message.createdAt), "dd 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2 flex-shrink-0 flex-wrap">
                            <Button
                              size="sm"
                              variant={message.status === 'nuevo' ? 'default' : 'outline'}
                              onClick={() => updateMessageStatusMutation.mutate({ 
                                id: message.id, 
                                status: 'leído'
                              })}
                              disabled={updateMessageStatusMutation.isPending}
                              data-testid={`button-mark-read-${message.id}`}
                            >
                              Marcar leído
                            </Button>
                            <Button
                              size="sm"
                              variant={message.status === 'respondido' ? 'default' : 'outline'}
                              onClick={() => updateMessageStatusMutation.mutate({ 
                                id: message.id, 
                                status: 'respondido'
                              })}
                              disabled={updateMessageStatusMutation.isPending}
                              data-testid={`button-mark-responded-${message.id}`}
                            >
                              Marcar respondido
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (confirm(`¿Eliminar mensaje de ${message.name}?`)) {
                                  deleteMessageMutation.mutate(message.id);
                                }
                              }}
                              disabled={deleteMessageMutation.isPending}
                              data-testid={`button-delete-message-${message.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8">
              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total proyectos</p>
                      <p className="text-3xl font-display font-bold">{projectsList.length}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Activos</p>
                      <p className="text-3xl font-display font-bold">
                        {projectsList.filter((p: any) => p.isActive === 1).length}
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Inactivos</p>
                      <p className="text-3xl font-display font-bold">
                        {projectsList.filter((p: any) => p.isActive === 0).length}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-500/10 rounded-lg">
                      <X className="w-6 h-6 text-gray-500" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Add Project Button */}
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl font-bold">Gestión de proyectos</h2>
                <Button
                  onClick={() => {
                    resetProjectForm();
                    setShowProjectForm(!showProjectForm);
                  }}
                  data-testid="button-add-project"
                >
                  {showProjectForm ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo proyecto
                    </>
                  )}
                </Button>
              </div>

              {/* Project Form */}
              {showProjectForm && (
                <Card className="p-6">
                  <h3 className="font-display text-xl font-bold mb-6">
                    {editingProject ? 'Editar proyecto' : 'Nuevo proyecto'}
                  </h3>
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          required
                          data-testid="input-project-title"
                          placeholder="Nombre del proyecto"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría *</Label>
                        <Input
                          id="category"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          required
                          data-testid="input-project-category"
                          placeholder="Ej: Diseño Web, E-commerce, etc."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción *</Label>
                      <Textarea
                        id="description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        required
                        data-testid="input-project-description"
                        placeholder="Describe el proyecto..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="externalLink">Link externo (opcional)</Label>
                        <Input
                          id="externalLink"
                          type="url"
                          value={projectForm.externalLink}
                          onChange={(e) => setProjectForm({ ...projectForm, externalLink: e.target.value })}
                          data-testid="input-project-link"
                          placeholder="https://ejemplo.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="displayOrder">Orden de visualización</Label>
                        <Input
                          id="displayOrder"
                          type="number"
                          value={projectForm.displayOrder}
                          onChange={(e) => setProjectForm({ ...projectForm, displayOrder: parseInt(e.target.value) || 0 })}
                          data-testid="input-project-order"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">
                        Imagen {editingProject ? '(opcional - dejar vacío para mantener actual)' : '*'}
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingProject}
                        data-testid="input-project-image"
                      />
                      {imagePreview && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">Vista previa:</p>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-w-md rounded-lg border"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={projectForm.isActive}
                        onCheckedChange={(checked) => setProjectForm({ ...projectForm, isActive: checked })}
                        data-testid="switch-project-active"
                      />
                      <Label htmlFor="isActive">Proyecto activo (visible en la web)</Label>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                        data-testid="button-submit-project"
                      >
                        {createProjectMutation.isPending || updateProjectMutation.isPending
                          ? 'Guardando...'
                          : editingProject
                          ? 'Actualizar proyecto'
                          : 'Crear proyecto'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetProjectForm();
                          setShowProjectForm(false);
                        }}
                        data-testid="button-cancel-project"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* Projects List */}
              <div className="space-y-4">
                {projectsLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Cargando proyectos...</p>
                  </div>
                ) : projectsList.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No hay proyectos todavía</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsList.map((project: any) => (
                      <Card key={project.id} className="overflow-hidden hover-elevate">
                        <div className="aspect-video relative bg-muted">
                          <img
                            src={project.imagePath}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          {project.isActive === 0 && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="outline">Inactivo</Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-display font-bold text-lg mb-1">
                              {project.title}
                            </h3>
                            <Badge variant="secondary">{project.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                          {project.externalLink && (
                            <a
                              href={project.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Ver proyecto
                            </a>
                          )}
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProject(project)}
                              data-testid={`button-edit-project-${project.id}`}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (confirm(`¿Eliminar proyecto "${project.title}"?`)) {
                                  deleteProjectMutation.mutate(project.id);
                                }
                              }}
                              disabled={deleteProjectMutation.isPending}
                              data-testid={`button-delete-project-${project.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
