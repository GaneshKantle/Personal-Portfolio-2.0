import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { connectionManager } from "./connectionManager";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Backend connections status endpoint
  app.get("/api/connections", (_req, res) => {
    const statuses = connectionManager.getStatuses();
    const allConnected = statuses.every(s => s.status === 'connected');
    
    res.json({
      status: allConnected ? 'healthy' : 'degraded',
      connections: statuses,
      timestamp: new Date().toISOString()
    });
  });

  // Individual backend health check
  app.get("/api/connections/:name/health", async (req, res) => {
    const { name } = req.params;
    const statuses = connectionManager.getStatuses();
    const status = statuses.find(s => s.name === name);
    
    if (!status) {
      return res.status(404).json({ error: "Backend not found" });
    }
    
    res.json(status);
  });

  // API routes for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate inputs
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Here you would typically integrate with an email service
      // For now, we'll just return a success response
      
      return res.status(200).json({ 
        success: true, 
        message: "Message received! Thank you for reaching out." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
