import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const VPS_HOST = "http://34.174.119.160"; // Asegúrate que esté escuchando en puerto 80

app.use("/", createProxyMiddleware({
  target: VPS_HOST,
  changeOrigin: true,
  ws: true, // WebSocket compatible
  onError: (err, req, res) => {
    console.error("Proxy error:", err.message);
    res.writeHead(502);
    res.end("Bad Gateway");
  }
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Proxy funcionando en puerto ${PORT}`);
});
