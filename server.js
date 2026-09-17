const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = Number(process.env.PORT || 3000);
const startupTime = Date.now();
app.use(express.json());

const readJson = (filePath) => {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch (_) { return []; }
};
const trends = readJson(path.join(__dirname, 'data', 'trends.json'));

app.get('/api/health', (req, res) => res.json({
  ok: true,
  service: 'asst.tigtoger',
  status: 'healthy',
  uptimeSeconds: Math.floor((Date.now() - startupTime) / 1000),
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development'
}));

app.get('/api/health/database', (req, res) => res.json({
  ok: true,
  status: 'connected',
  database: 'local-json-dataset',
  provider: 'internal-data-store',
  timestamp: new Date().toISOString()
}));

app.get('/api/trends', (req, res) => res.json({
  source: 'local-data',
  updatedAt: new Date().toISOString(),
  trends: Array.isArray(trends) ? trends : []
}));

app.get('/api/auth/tiktok/status', (req, res) => {
  const ready = Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET && process.env.TIKTOK_REDIRECT_URL);
  res.json({ ready, connected: false, provider: 'tiktok-oauth', message: ready ? 'TikTok OAuth is ready.' : 'TikTok OAuth is not configured yet.' });
});

app.get('/api/auth/tiktok/start', (req, res) => {
  const configured = Boolean(process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET && process.env.TIKTOK_REDIRECT_URL);
  if (!configured) return res.status(501).json({ ok: false, url: null, message: 'Add TikTok OAuth environment variables first.' });
  const authUrl = new URL('https://www.tiktok.com/auth/authorize');
  authUrl.searchParams.set('client_key', process.env.TIKTOK_CLIENT_KEY);
  authUrl.searchParams.set('scope', 'user.info.basic');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', process.env.TIKTOK_REDIRECT_URL);
  authUrl.searchParams.set('state', 'asst_tigtoger_state');
  res.json({ ok: true, url: authUrl.toString() });
});

app.get('/api/payments/status', (req, res) => {
  const ready = Boolean(process.env.STRIPE_SECRET_KEY || process.env.OMISE_PUBLIC_KEY);
  res.json({ ready, provider: ready ? 'configured' : 'not-configured', message: ready ? 'Payment gateway is configured.' : 'Payment gateway is not configured yet.' });
});

app.use('/_sdk', express.static(path.join(__dirname, '_sdk')));
app.use(express.static(__dirname, { index: false }));
app.get('/', (req, res) => {
  const htmlFile = path.join(__dirname, '_!doctype html_.txt');
  if (fs.existsSync(htmlFile)) return res.type('html').sendFile(htmlFile);
  res.status(404).send('App file not found.');
});
app.use((req, res) => res.status(404).json({ ok: false, message: 'Route not found', path: req.originalUrl }));

app.listen(port, () => console.log(`Asst.tigtoger backend running on port ${port}`));
