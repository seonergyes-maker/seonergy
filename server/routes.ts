import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { seoAnalysis, contactMessages, projects } from "@shared/schema";
import { insertSeoAnalysisSchema, insertContactMessageSchema, insertProjectSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { analyzeSEO } from "./seo-analyzer";
import { generateAntispamToken, validateAntispam } from "./antispam";
import { upload } from "./upload";
import { promises as fs } from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Admin authentication middleware
  const checkAdminAuth = (req: Request, res: Response, next: Function) => {
    const { email, password } = req.body;
    
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      next();
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  };

  // Admin login
  app.post("/api/admin/login", checkAdminAuth, (req: Request, res: Response) => {
    res.json({ success: true, message: "Autenticación exitosa" });
  });

  // Analyze website SEO (real-time analysis)
  app.post("/api/analyze-seo", async (req: Request, res: Response) => {
    try {
      const { website } = req.body;
      
      if (!website) {
        return res.status(400).json({ error: "URL de sitio web requerida" });
      }

      const analysis = await analyzeSEO(website);
      res.json(analysis);
    } catch (error: any) {
      console.error("Error analyzing website:", error);
      res.status(500).json({ error: error.message || "Error al analizar el sitio web" });
    }
  });

  // Save SEO analysis
  app.post("/api/seo-analysis", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSeoAnalysisSchema.parse(req.body);
      
      const [result] = await db.insert(seoAnalysis).values(validatedData);
      const [newAnalysis] = await db
        .select()
        .from(seoAnalysis)
        .where(eq(seoAnalysis.id, result.insertId));
      
      res.json(newAnalysis);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get SEO analysis by unique ID
  app.get("/api/seo-analysis/:uniqueId", async (req: Request, res: Response) => {
    try {
      const { uniqueId } = req.params;
      
      const [analysis] = await db
        .select()
        .from(seoAnalysis)
        .where(eq(seoAnalysis.uniqueId, uniqueId));
      
      if (!analysis) {
        return res.status(404).json({ error: "Análisis no encontrado" });
      }
      
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all SEO analyses (admin only)
  app.post("/api/admin/seo-analysis", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const analyses = await db
        .select()
        .from(seoAnalysis)
        .orderBy(seoAnalysis.createdAt);
      
      res.json(analyses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark SEO analysis as contacted (admin only)
  app.patch("/api/admin/seo-analysis/:id/contacted", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { contacted } = req.body;
      
      await db
        .update(seoAnalysis)
        .set({ contacted: contacted ? 1 : 0 })
        .where(eq(seoAnalysis.id, id));
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete SEO analysis (admin only)
  app.delete("/api/admin/seo-analysis/:id", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      await db
        .delete(seoAnalysis)
        .where(eq(seoAnalysis.id, id));
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== CONTACT MESSAGES =====

  // Get antispam token
  app.get("/api/contact/token", (req: Request, res: Response) => {
    const token = generateAntispamToken();
    res.json({ token, timestamp: Date.now() });
  });

  // Submit contact message
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, message, token, timestamp, honeypot } = req.body;
      
      // Validate antispam
      const validation = validateAntispam({ token, honeypot, timestamp });
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }

      // Validate and save message
      const validatedData = insertContactMessageSchema.parse({ name, email, phone, message });
      
      const [result] = await db.insert(contactMessages).values(validatedData);
      res.json({ success: true, id: result.insertId });
    } catch (error: any) {
      console.error("Error saving contact message:", error);
      res.status(400).json({ error: error.message || "Error al enviar mensaje" });
    }
  });

  // Get all contact messages (admin only)
  app.post("/api/admin/contact-messages", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const messages = await db
        .select()
        .from(contactMessages)
        .orderBy(contactMessages.createdAt);
      
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update contact message status (admin only)
  app.patch("/api/admin/contact-messages/:id/status", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!["nuevo", "leído", "respondido"].includes(status)) {
        return res.status(400).json({ error: "Estado inválido" });
      }
      
      await db
        .update(contactMessages)
        .set({ status })
        .where(eq(contactMessages.id, id));
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete contact message (admin only)
  app.delete("/api/admin/contact-messages/:id", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      await db
        .delete(contactMessages)
        .where(eq(contactMessages.id, id));
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PROJECTS =====

  // Get all active projects (public)
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projectsList = await db
        .select()
        .from(projects)
        .where(eq(projects.isActive, 1))
        .orderBy(projects.displayOrder);
      
      res.json(projectsList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all projects (admin only - includes inactive)
  app.post("/api/admin/projects", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const projectsList = await db
        .select()
        .from(projects)
        .orderBy(projects.displayOrder);
      
      res.json(projectsList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create project with image (admin only)
  app.post("/api/admin/projects/create", checkAdminAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Se requiere una imagen" });
      }

      const { title, category, description, externalLink, displayOrder, isActive } = req.body;
      const imagePath = `/uploads/projects/${req.file.filename}`;

      const projectData = {
        title,
        category,
        description,
        imagePath,
        externalLink: externalLink || null,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        isActive: isActive === 'true' || isActive === '1' ? 1 : 0,
      };

      const [result] = await db.insert(projects).values(projectData);
      const [newProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, result.insertId));
      
      res.json(newProject);
    } catch (error: any) {
      console.error("Error creating project:", error);
      if (req.file) {
        await fs.unlink(path.join(process.cwd(), 'uploads', 'projects', req.file.filename)).catch(() => {});
      }
      res.status(500).json({ error: error.message });
    }
  });

  // Update project (admin only)
  app.patch("/api/admin/projects/:id", checkAdminAuth, upload.single('image'), async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, category, description, externalLink, displayOrder, isActive } = req.body;

      const [existingProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id));

      if (!existingProject) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }

      const updateData: any = {
        title,
        category,
        description,
        externalLink: externalLink || null,
        displayOrder: displayOrder ? parseInt(displayOrder) : existingProject.displayOrder,
        isActive: isActive === 'true' || isActive === '1' ? 1 : 0,
      };

      if (req.file) {
        const oldImagePath = path.join(process.cwd(), existingProject.imagePath.replace('/uploads/', 'uploads/'));
        await fs.unlink(oldImagePath).catch(() => {});
        updateData.imagePath = `/uploads/projects/${req.file.filename}`;
      }

      await db
        .update(projects)
        .set(updateData)
        .where(eq(projects.id, id));

      const [updatedProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id));
      
      res.json(updatedProject);
    } catch (error: any) {
      console.error("Error updating project:", error);
      if (req.file) {
        await fs.unlink(path.join(process.cwd(), 'uploads', 'projects', req.file.filename)).catch(() => {});
      }
      res.status(500).json({ error: error.message });
    }
  });

  // Delete project (admin only)
  app.delete("/api/admin/projects/:id", checkAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id));

      if (!project) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }

      const imagePath = path.join(process.cwd(), project.imagePath.replace('/uploads/', 'uploads/'));
      await fs.unlink(imagePath).catch(() => {});

      await db
        .delete(projects)
        .where(eq(projects.id, id));
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
