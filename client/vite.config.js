import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      // forward requests starting with /api to the backend
      "/api": {
        target: "https://mega-backend-1jay.onrender.com/walletx",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path // keep /api/v1/users/register intact
      }
    }
  }
})
