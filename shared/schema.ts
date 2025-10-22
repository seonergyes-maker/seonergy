import { mysqlTable, varchar, text, timestamp, int, tinyint } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = mysqlTable("contacts", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("nuevo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const seoAnalysis = mysqlTable("seo_analysis", {
  id: int("id").primaryKey().autoincrement(),
  uniqueId: varchar("unique_id", { length: 100 }).notNull().unique(),
  website: varchar("website", { length: 500 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  results: text("results").notNull(),
  contacted: tinyint("contacted").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectsSeoweb = mysqlTable("projects_seoweb", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description").notNull(),
  imagePath: varchar("image_path", { length: 500 }).notNull(),
  externalLink: varchar("external_link", { length: 500 }),
  displayOrder: int("display_order").notNull().default(0),
  isActive: tinyint("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalysis).omit({
  id: true,
  createdAt: true,
  contacted: true,
});

export const insertProjectSchema = createInsertSchema(projectsSeoweb).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalysis.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsSeoweb.$inferSelect;
