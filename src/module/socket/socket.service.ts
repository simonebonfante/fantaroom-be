import { getIO } from './index';

export function notifyNewSession(sessionId: string, playerId: string) {
    const io = getIO();
    io.emit('new-session', {
        sessionId, 
        playerId,
    });
}

export function notifyNewBid(sessionId: string, bidId: string, userId: string, price: number) {
    const io = getIO();
    io.emit('new-bid', {
        sessionId,
        bidId,
        userId,
        price,
    });
}

export function declareWinner(sessionId: string, winnerId: string) {
    const io = getIO();
    io.emit('winner-declared', {
        sessionId,
        winnerId,
    });
}