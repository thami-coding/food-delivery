import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Splitting vendor dependencies into their own chunk
          if (id.includes("node_modules")) {
            return "vendor"
          }
        },
      },
    },
  },
  server: {
    allowedHosts: ["fd5e-168-210-105-91.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
