import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  plugins: [react()],
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
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
  },
});
