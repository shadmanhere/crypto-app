import express from 'express';
import {Server} from 'socket.io';

const PORT = 3000;
const app = express().listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const socketHandler = new Server(app);

socketHandler.on('connection', socket => {
  socket.on('connection_error', () => {
    console.log('Connection error!');
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected!');
  });
  console.log('client connected');
  socket.emit('crypto', 'Hello Cryptos Client!');
});
