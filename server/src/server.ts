/* eslint-disable no-console */
import mongoose from 'mongoose';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import config from './../config';
import app from './app';

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

const DB = config.database.replace('<PASSWORD>', config.databasePassword);

mongoose
  .set('strictQuery', false) // as per Mongoose DeprecationWarning
  .connect(DB)
  .then(() => console.log('Connected to DB'));

const port = config.port || 4300;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
