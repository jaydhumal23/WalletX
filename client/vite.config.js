import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // forward requests starting with /api to the backend
      "/api": {
        target: "https://walletx-jay.duckdns.org/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path // keep /api/v1/users/register intact
      }
    }
  }
})
