// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import { createServer as createViteServer } from "vite";
import express from "express";
import path from "path";
import fs from "fs";
function log(message) {
  const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  console.log(`${timestamp} [express] ${message}`);
}
async function setupVite(app2, server) {
  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      // Important: Make sure this matches the directory where your client files are located
      root: path.resolve(process.cwd(), "client")
    });
    app2.use(vite.middlewares);
    app2.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api")) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), "client", "index.html");
        let html = fs.readFileSync(indexPath, "utf-8");
        html = await vite.transformIndexHtml(url, html);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
    log("\u2705 Vite development server initialized");
  } catch (error) {
    log(`\u274C Error setting up Vite: ${error.message}`);
    throw error;
  }
}
function serveStatic(app2) {
  const clientDistPath = path.resolve(process.cwd(), "dist", "public");
  app2.use(express.static(clientDistPath));
  app2.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return;
    }
    res.sendFile(path.resolve(clientDistPath, "index.html"));
  });
  log("\u2705 Static file serving initialized for production");
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, () => {
    log(`\u{1F680} Server running locally at http://localhost:${port}`);
  });
})();
