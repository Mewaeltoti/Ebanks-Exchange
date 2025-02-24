import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    // Enable minification
    minify: 'esbuild',
    // Ensure assets are correctly hashed for caching
    assetsDir: 'assets',
    // Enable CSS code spliatting
    cssCodeSplit: true,
  },
  plugins: [react(),],
})
