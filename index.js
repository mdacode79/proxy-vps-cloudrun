import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Cambia esta IP por la IP pública de tu VPS
const target = 'http://34.174.119.160';

app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true
}));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Proxy en Cloud Run activo en el puerto ${port}`);
});
