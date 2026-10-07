import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ command }) => {
  const plugins: Plugin[] = [react()];

  if (command === 'serve') {
    const { apiApp } = await import('./server/api.js');
    plugins.push({
      name: 'api-server-plugin',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, next) => {
          apiApp(req, res, next);
        });
      },
    });
  }

  return {
    plugins,
    server: {
      port: 3000,
      open: false,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
