import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: {
        name: 'Cours avancés — apprentissage',
        short_name: 'Cours avancés',
        description:
          "Application personnelle d'apprentissage : optimisation, maths financières, CFA et vocabulaire anglais.",
        lang: 'fr',
        dir: 'ltr',
        theme_color: '#4f46e5',
        background_color: '#f4f5f8',
        display: 'standalone',
        orientation: 'any',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Cache tout l'app-shell + le contenu embarqué pour un vrai hors-ligne.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,json,md}'],
        // Le HTML d'origine des fiches sert d'entrée à `npm run fiches` ; son
        // contenu est déjà dans le paquet, en Markdown. Le précacher ferait
        // télécharger 3,3 Mo deux fois.
        globIgnores: ['**/cours/fiches/*.html'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
        // Sans cette exclusion, ouvrir un PDF (qui est une navigation) renvoie
        // index.html : on recevait l'application au lieu du document.
        navigateFallbackDenylist: [/^\/cours\//, /\.pdf$/i, /\/[^/?]+\.[^/?]+$/],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  build: {
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          katex: ['katex', 'markdown-it', '@vscode/markdown-it-katex'],
          db: ['dexie', 'dexie-react-hooks'],
        },
      },
    },
  },
});
