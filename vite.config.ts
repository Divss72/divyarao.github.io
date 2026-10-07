import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
function apiPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const { apiApp } = await import('./server/api.js');
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
