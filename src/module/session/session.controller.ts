import { Request, Response } from 'express';
import Session from '../../models/Session';
import User from '../../models/User';
import Bid from '../../models/Bid';
import Player from '../../models/Player';
import { placeBidTx } from './session.service';
import { getIO } from '../socket/index';
import { notifyNewBid, notifyWinner } from '../socket/socket.service';

export async function declareWinner(_: Request, res: Response) {
  const activeSession = await Session.findOne({ where: { isActive: true } });
  if (!activeSession) {
    return res.status(404).json({ error: 'Nessuna sessione attiva trovata' });
  }
  const lastBid = await Bid.findOne({ where: { sessionId: activeSession.id, isLastBid: true } });
  if (!lastBid) {
    return res.status(404).json({ error: 'Nessun bid trovato' });
  }
  const winner = await User.findByPk(lastBid.userId);
  if (!winner) {
    return res.status(404).json({ error: 'Vincitore non trovato' });
  }
  activeSession.winnerId = winner.id;
  activeSession.isActive = false;
  await activeSession.save();
  notifyWinner(activeSession.id, winner.id, winner.name, activeSession.price);
  res.json({ message: 'Winner declared', winner });
}

export async function placeBid(req: Request, res: Response) {
  const { userId, price } = req.body;
  try {
    const newBid = await placeBidTx(userId, price);
    const user = await User.findByPk(newBid.userId);
    if (!user) {
      throw new Error('Utente non trovato');
    }
    notifyNewBid(newBid.sessionId, newBid.id, newBid.userId, user.name, newBid.price);
    res.json({ message: 'Bid placed', bid: newBid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Errore sconosciuto' });
  }
}

export async function startNewSession(playerId: string) {
    const activeSession = await Session.findOne({ where: { isActive: true } });
    if (activeSession) {
        throw new Error('Sessione attiva trovata, impossibile lanciare un giocatore');
    }
    const player = await Player.findByPk(playerId);
    if (!player) {
        throw new Error('Giocatore non trovato');
    }
    const newSession = await Session.create({ isActive: true, playerId: player.id, price: 0 });
    return newSession;
}

export async function getSession(req: Request, res: Response) {
  const { id } = req.params;
  const session = await Session.findByPk(id, { include: [{ model: Player, as: 'player' }, { model: Bid, as: 'bids' }] });
  if (!session) {
    return res.status(404).json({ error: 'Sessione non trovata' });
  }
  res.json({ session });
}

export async function getActiveSession(_: Request, res: Response) {
  const session = await Session.findOne({ 
    where: { isActive: true }, 
    include: [
      { model: Player, as: 'player' },
      { 
        model: Bid, 
        as: 'bids',
        where: { isLastBid: true },
        required: false,
        include: [{ model: User, as: 'user' }]
      }
    ] 
  });
  if (!session) {
    return res.status(404).json({ error: 'Nessuna sessione attiva trovata' });
  }
  res.json({ session });
}