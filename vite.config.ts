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
    minify: 'esbuild',
    target: 'es2018',
    cssCodeSplit: true,
    reportCompressedSize: false, // mais rápido no CI/CD
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Chunks estáveis por domínio — maximize cache hit rate
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('react-router') || id.includes('react')) return 'vendor-react';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('lucide-react')) return 'vendor-ui';
          }
          // Chunk separado para páginas pesadas
          if (id.includes('src/components/GalleryPage') || id.includes('src/components/GalleryAlbums') || id.includes('src/components/GalleryVideos')) return 'page-gallery';
          if (id.includes('src/components/StorePage') || id.includes('src/components/StoreCatalog') || id.includes('src/components/StoreHero')) return 'page-store';
          if (id.includes('src/components/ClubPage') || id.includes('src/components/ClubHistory') || id.includes('src/components/ClubTimeline') || id.includes('src/components/ClubMuseum')) return 'page-club';
          if (id.includes('src/components/AdminDashboard')) return 'page-admin';
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
})
