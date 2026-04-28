import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // esbuild (built-in with Vite 6) — faster than terser, same quality
    minify: 'esbuild',
    target: 'es2018',
    rollupOptions: {
      output: {
        // Split vendor chunks so the main bundle stays small and browser can cache them separately
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
  },
  esbuild: {
    // Drop console.* and debugger statements in production
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
})
