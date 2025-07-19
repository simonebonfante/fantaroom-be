import { getIO } from './index';

export function notifyNewSession(sessionId: string, playerId: string) {
    const io = getIO();
    console.log('notify new-session', sessionId, playerId);
    io.emit('new-session', {
        sessionId, 
        playerId,
    });
}

export function notifyNewBid(sessionId: string, bidId: string, userId: string, price: number) {
    const io = getIO();
    console.log('notify new-bid', sessionId, bidId, userId, price);
    io.emit('new-bid', {
        sessionId,
        bidId,
        userId,
        price,
    });
}

export function notifyWinner(sessionId: string, winnerId: string) {
    const io = getIO();
    console.log('notify winner-declared', sessionId, winnerId);
    io.emit('winner-declared', {
        sessionId,
        winnerId,
    });
}