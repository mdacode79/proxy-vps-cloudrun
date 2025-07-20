const http = require('http');
const net = require('net');
const url = require('url');

// IP y puerto de tu VPS (ajústalo si es necesario)
const VPS_HOST = 34.174.119.160; // reemplaza por la IP real de tu VPS
const VPS_PORT = 22;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Proxy VPS Cloud Run\n');
});

// Manejar solicitudes CONNECT para túnel SSH
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`//${req.url}`, false, true);

  const targetPort = port || VPS_PORT;
  const targetHost = hostname || VPS_HOST;

  const serverSocket = net.connect(targetPort, targetHost, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on('error', () => {
    clientSocket.end('HTTP/1.1 502 Bad Gateway\r\n');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('Proxy Cloud Run listening on port', PORT);
