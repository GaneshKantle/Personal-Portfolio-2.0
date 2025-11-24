import { createServer as createViteServer } from "vite";
import { Server } from "http";
import express, { Express } from "express";
import path from "path";
import fs from "fs";

// Setup logger function
export function log(message: string) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [express] ${message}`);
}

// Setup Vite in development mode
export async function setupVite(app: Express, server: Server) {
  try {
    // Create Vite server in middleware mode with config file
    // This ensures path aliases from vite.config.ts are properly resolved
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), 'vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // Use Vite's connect instance as middleware
    app.use(vite.middlewares);

    // For SPA client-side routing, serve index.html for all non-API routes
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Skip API routes
      if (url.startsWith('/api')) {
        return next();
      }

      try {
        // Read index.html
        const indexPath = path.resolve(process.cwd(), 'client', 'index.html');
        let html = fs.readFileSync(indexPath, 'utf-8');
        
        // Apply Vite HTML transforms
        html = await vite.transformIndexHtml(url, html);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        // If an error occurs, let Vite fix the stack trace
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    log("✅ Vite development server initialized");
  } catch (error) {
    log(`❌ Error setting up Vite: ${(error as Error).message}`);
    throw error;
  }
}

// Serve static files in production
export function serveStatic(app: Express) {
  // Vite builds to dist/, not dist/public
  const clientDistPath = path.resolve(process.cwd(), 'dist');
  
  app.use(express.static(clientDistPath));
  
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return;
    }
    
    // Serve index.html for client-side routing
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
  
  log("✅ Static file serving initialized for production");
}