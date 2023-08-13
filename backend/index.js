import express from 'express';
import {Server} from 'socket.io';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const socketHandler = new Server(server);

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
      headers: {'x-messari-api-key': process.env.MESSARI_API_KEY},
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

setInterval(() => getPrices(), 60000);

app.get('/cryptos/profile/', (req, res) => {
  res.json({error: true, message: 'Missing Crypto Id in API URL'});
});

app.get('/cryptos/profile/:id', (req, res) => {
  const cryptoId = req.params.id;
  if (!cryptoId) {
    res.json({error: true, message: 'Missing Crypto Id in API URL'});
  }

  axios
    .get(`${process.env.BASE_URL_V2}/${cryptoId}/profile`, {
      headers: {'x-messari-api-key': process.env.MESSARI_API_KEY},
    })
    .then(resData => {
      res.json(resData.data.data);
    })
    .catch(err => {
      res.json({
        error: true,
        message: 'Error Fetching Prices Data From API',
        errorDetails: err,
      });
    });
});

app.get('/cryptos/market-data/', (req, res) => {
  res.json({error: true, message: 'Missing Crypto Id in API URL'});
});

app.get('/cryptos/market-data/:id', (req, res) => {
  const cryptoId = req.params.id;
  if (!cryptoId) {
    res.json({error: true, message: 'Missing Crypto Id in API URL'});
  }

  axios
    .get(`${process.env.BASE_URL_V1}/${cryptoId}/metrics/market-data`, {
      headers: {'x-messari-api-key': process.env.MESSARI_API_KEY},
    })
    .then(resData => {
      res.json(resData.data.data);
    })
    .catch(err => {
      res.json({
        error: true,
        message: 'Error Fetching Prices Data From API',
        errorDetails: err,
      });
    });
});
