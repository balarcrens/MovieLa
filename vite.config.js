import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Moviela - Download HD Movies",
        short_name: "Moviela",
        start_url: "/",
        display: "standalone",
        background_color: "#111827",
        theme_color: "#111827",
        description: "Moviela - Download latest movies in HD, 720p, 1080p, and 4K quality. Fast and secure direct links via Telegram Cloud.",
        icons: [
          {
            src: "/logo-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logo-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
})
