import { type Contact, type InsertContact, type SeoAnalysis, type InsertSeoAnalysis } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createSeoAnalysis(analysis: InsertSeoAnalysis): Promise<SeoAnalysis>;
  getAllContacts(): Promise<Contact[]>;
  getAllSeoAnalysis(): Promise<SeoAnalysis[]>;
}
