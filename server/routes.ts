import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { seoAnalysis } from "@shared/schema";
import { insertSeoAnalysisSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { analyzeSEO } from "./seo-analyzer";

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

  const httpServer = createServer(app);
  return httpServer;
}
