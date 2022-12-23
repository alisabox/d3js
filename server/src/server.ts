/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import app from './app';

dotenv.config({ path: './config.env' });

const server = http.createServer(app);

const webSocket = new WebSocketServer({ server });

webSocket.on('connection', socket => {
  socket.on('message', (data, isBinary) => {
    const message = isBinary ? data : String(data);
    webSocket.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD ?? ''
) ?? '';

mongoose
  .connect(DB)
  .then(() => console.log('Connected to DB'));

const port = process.env.PORT || 4300;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
