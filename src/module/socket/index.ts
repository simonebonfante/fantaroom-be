// src/socket/index.ts
import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer | null = null;

export function initSocket(server: SocketIOServer) {
  io = server;

  // hook di connessione – puoi spostare qui la logica d’asta
  io.on('connection', (socket: Socket) => {
    console.log('🔌 User connected', socket.id);
  });
}

export function getIO(): SocketIOServer {
  if (!io) throw new Error('Socket.IO non inizializzato');
  return io;
}