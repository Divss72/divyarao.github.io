import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { apiApp } from './server/api.js';

function apiPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use('/api', (req, res, next) => {
        apiApp(req, res, next);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
