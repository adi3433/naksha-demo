import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base './' keeps asset URLs relative so the build works at any path,
// including https://<user>.github.io/<repo>/.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    chunkSizeWarningLimit: 1000
  }
});
