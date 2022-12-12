import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';
import app from './app';

const server = http.createServer(app);

const webSocket = new WebSocketServer({ server });

webSocket.on('connection', socket => {
  socket.on('message', (data, isBinary) => {
    const message = isBinary ? data : JSON.stringify(data);
    webSocket.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const PORT = 4300;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
