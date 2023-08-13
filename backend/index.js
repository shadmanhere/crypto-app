import express from 'express';
import {Server} from 'socket.io';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
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

const getPrices = () =>
  axios
    .get(process.env.LIST_URL, {
      headers: {'x-messari-api-key': process.env.MESSARI_API},
    })
    .then(res => {
      const priceList = res.data.data.map(item => {
        return {
          id: item.id,
          name: item.symbol,
          price: item.metrics.market_data.price_usd,
        };
      });

      socketHandler.emit('crypto', priceList);
    })
    .catch(err => {
      console.log(err);
      socketHandler.emit('crypto', {
        error: true,
        message: 'Error Fetching Prices Data From API',
      });
    });

setInterval(() => getPrices(), 20000);
