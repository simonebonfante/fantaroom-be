import { Server as SocketIOServer } from 'socket.io';
import User from './models/User';
import Player from './models/Player';

type AuctionState = {
  player: Player;
  price: number;
  bidder: User | null;
};

export function setupSocket(io: SocketIOServer) {
  let availablePlayers: Player[] = [];
  let currentAuction: AuctionState | null = null;

  io.on('connection', async (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Carica i giocatori disponibili all'inizio di ogni connessione
    // availablePlayers = await Player.findAll({ where: { taken: false } });

    // socket.on('set-nickname', async (nickname: string, callback: (response: { userId?: string; error?: string }) => void) => {
    //   try {
    //     const existingUser = await User.findOne({ where: { name: nickname } });
    
    //     if (existingUser) {
    //       callback({ userId: existingUser.id });
    //     } else {
    //       // Se non esiste, lo creiamo
    //       const newUser = await User.create({ name: nickname, isAdmin: false });
    //       callback({ userId: newUser.id });
    //     }
    //   } catch (error) {
    //     console.error('Error setting nickname:', error);
    //     callback({ error: 'Server error' });
    //   }
    // });

    // socket.on('launch-player', async () => {
    //   if (availablePlayers.length === 0) {
    //     socket.emit('no-players-left');
    //     return;
    //   }

    //   const player = availablePlayers.pop()!;
    //   currentAuction = { player, price: 1, bidder: null };

    //   io.emit('player-launched', {
    //     player,
    //     price: 1,
    //     bidder: null,
    //   });
    // });

    // socket.on('place-bid', async ({ userId, price }: { userId: string; price: number }) => {
    //   if (!currentAuction) return;
    
    //   const user = await User.findByPk(userId);
    //   if (!user) return;
    
    //   if (price > currentAuction.price) {
    //     currentAuction.price = price;
    //     currentAuction.bidder = user;
    
    //     io.emit('bid-updated', {
    //       player: currentAuction.player,
    //       price,
    //       bidder: { id: user.id, nickname: user.name },
    //     });
    //   }
    // });

    // socket.on('declare-winner', async () => {
    //   if (!currentAuction || !currentAuction.bidder) return;
    
    //   const { player, price, bidder } = currentAuction;
    
    //   await UserPlayer.create({
    //     userId: bidder.id,
    //     playerId: player.id,
    //     price,
    //   });
    
    //   await Player.update({ taken: true }, { where: { id: player.id } });
    
    //   io.emit('player-assigned', {
    //     player,
    //     price,
    //     bidder: { id: bidder.id, nickname: bidder.name },
    //   });
    
    //   currentAuction = null;
    // });
    

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
}
