import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      output: {
        // Customize the naming of asset files (e.g., images, fonts, etc.)
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
