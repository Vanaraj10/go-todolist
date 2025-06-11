import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  preview: {
    port: 4173,
    host: true,
    cors: true,
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  assetsInclude: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
})
