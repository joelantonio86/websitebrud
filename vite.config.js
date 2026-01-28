// =========================================================
// VITE CONFIG - Sistema de Build Simples
// =========================================================

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                repertorio: resolve(__dirname, 'repertorio.html'),
                partituras: resolve(__dirname, 'partituras.html'),
                eventos: resolve(__dirname, 'eventos.html'),
                letras: resolve(__dirname, 'letras-musicas.html'),
                material: resolve(__dirname, 'material-apoio.html'),
                sibeliusComputador: resolve(__dirname, 'sibelius-computador.html'),
                sibeliusIOS: resolve(__dirname, 'sibelius-ios.html'),
                sibeliusAndroid: resolve(__dirname, 'sibelius-android.html')
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        cssMinify: true,
        assetsInlineLimit: 4096
    },
    server: {
        port: 3000,
        open: true
    },
    optimizeDeps: {
        include: []
    }
});
