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
  server: {
    host: true, // expor na rede local — permite abrir no telemóvel via IP da máquina
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
            // lucide-react e react-router-dom contêm "react" no caminho: têm de
            // ser testados ANTES do runtime do React.
            if (id.includes('lucide-react')) return 'vendor-ui';
            if (id.includes('@supabase')) return 'vendor-supabase';
            // React, ReactDOM, o router e o scheduler ficam num único chunk.
            // Separá-los parte a inicialização CJS do React em produção
            // ("Cannot set properties of undefined (setting 'Children')").
            if (/[\\/]node_modules[\\/](react|react-dom|react-is|react-router|react-router-dom|scheduler|use-sync-external-store|object-assign|@remix-run)[\\/]/.test(id)) {
              return 'vendor-react';
            }
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
