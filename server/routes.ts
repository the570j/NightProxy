import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // No API routes needed for this static website
  // Just serving the static React application

  const httpServer = createServer(app);

  return httpServer;
}
