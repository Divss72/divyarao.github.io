import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiApp } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint for Render uptime and monitoring
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Mount API routes at /api
app.use('/api', apiApp);

import fs from 'fs';

// Serve static frontend files in production if dist exists, or fallback API response
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.use((_req, res) => {
    res.json({ status: 'ok', service: 'Divya Rao Portfolio API', health: '/health', api: '/api' });
  });
}

app.listen(PORT, () => {
  console.log(`[Private Studio Server] running at http://localhost:${PORT}`);
});
