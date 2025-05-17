import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
  ];

  return {
    root: path.resolve(__dirname, "client"),
    plugins,
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "client", "src") },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "client", "src", "components"),
        },
        {
          find: "@pages",
          replacement: path.resolve(__dirname, "client", "src", "pages"),
        },
        { find: "@shared", replacement: path.resolve(__dirname, "shared") },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "attached_assets"),
        },
      ],
    },
    build: {
      outDir: path.resolve(__dirname, "dist", "public"),
      emptyOutDir: true,
    },
  };
});
