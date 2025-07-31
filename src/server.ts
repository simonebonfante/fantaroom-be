import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import syncModels from './models/sync';
import routes from './routes';

import { initSocket } from './module/socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
});

initSocket(io);

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('FantaRoom backend is running');
});

(async () => {
  try {
    await syncModels();

    const PORT = process.env.PORT || 3001;
    server.listen({ port: PORT, host: '0.0.0.0' }, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during startup:', error);
  }
})();
