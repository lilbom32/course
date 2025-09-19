import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.API_KEY),
        'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              // Tách vendor libraries
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              ui: ['react-markdown', 'remark-gfm'],
              openai: ['openai'],
            },
          },
        },
      },
    };
});
