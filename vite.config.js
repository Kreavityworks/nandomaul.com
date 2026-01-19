import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Menggunakan './' memastikan file terpanggil benar di sub-directory GitHub Pages/Vercel
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Mengoptimalkan ukuran file final
    minify: 'terser',
    rollupOptions: {
      output: {
        // Menghindari masalah caching pada browser
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    }
  },
  server: {
    // Memudahkan kamu testing di device lain (HP) dalam satu jaringan
    host: true,
    port: 3000
  }
})