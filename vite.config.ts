import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Aumentar el límite de advertencia a 1200KB para reducir advertencias innecesarias
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
          output: {
            // Configurar manualChunks para dividir el código en chunks lógicos
            manualChunks: {
              // Bibliotecas principales de React
              'react-vendor': ['react', 'react-dom'],
              // Bibliotecas relacionadas con React Router
              'router-vendor': ['react-router-dom', 'react-router'],
              // Componentes relacionados con mapas
              'map-components': [],
              // Componentes relacionados con UI
              'ui-components': []
            }
          }
        }
      }
    };
});
