import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    // This ensures mockServiceWorker.js is copied as-is
    copyPublicDir: true,
  },
  esbuild: {
    target: "esnext"
  },
  server: {
    open: true,
    port: 3000,
  },
  publicDir: 'public',
});
