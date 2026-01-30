import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Para GitHub Pages: se o site fica em https://usuario.github.io/websitebrud/
// use base: '/websitebrud/'. Para site na raiz (repo usuario.github.io) use base: '/'.
const base = process.env.GITHUB_PAGES === 'true' ? '/websitebrud/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/types': resolve(__dirname, './src/types'),
      '@/styles': resolve(__dirname, './src/styles'),
      '@/assets': resolve(__dirname, './src/assets'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
    minify: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
});
