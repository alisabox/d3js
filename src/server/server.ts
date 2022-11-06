import * as http from 'http';
import { WebSocket, WebSocketServer } from 'ws';

const server = http.createServer((_req, _res) => {});
const webSocket = new WebSocketServer({ server });

webSocket.on('connection', socket => {
  socket.on('message', (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    webSocket.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
  })
})

server.listen(4300, () => console.log('Server is listening'));

