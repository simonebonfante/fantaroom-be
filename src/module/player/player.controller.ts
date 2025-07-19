import { Request, Response } from 'express';
import Player from '../../models/Player';
import Session from '../../models/Session';
import { startNewSession } from '../session/session.controller';
import { notifyNewSession } from '../socket/socket.service';

export async function getAllPlayers(_req: Request, res: Response) {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.error('Errore caricamento players:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}

export async function getAvailablePlayers(_req: Request, res: Response) {
  try {
    const players = await Player.findAll({ where: { taken: false } });
    res.json(players);
  } catch (error) {
    console.error('Errore caricamento players disponibili:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}

export async function getPlayerById(req: Request, res: Response) {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Giocatore non trovato' });
    }
    res.json(player);
  } catch (error) {
    console.error('Errore caricamento giocatore:', error);
    res.status(500).json({ error: 'Errore server' });
  }
} 

export async function launchPlayer(req: Request, res: Response) {
  const { role } = req.body;
  try {
    const activeSession = await Session.findOne({ where: { isActive: true } });
    if (activeSession) {
      return res.status(404).json({ error: 'Sessione attiva trovata, impossibile lanciare un giocatore' });
    }
    let playerLaunched: Player | null = null;
    const players = await Player.findAll({ where: { taken: false, role } });
    if (players.length === 0) {
      playerLaunched = null;
    } else {
      const randomIndex = Math.floor(Math.random() * players.length);
      playerLaunched = players[randomIndex];
      playerLaunched.taken = true;
      await playerLaunched.save();
    }
    if (!playerLaunched) {
      return res.status(404).json({ error: 'Nessun giocatore disponibile' });
    }
    const newSession = await startNewSession(playerLaunched.id);
    notifyNewSession(newSession.id, playerLaunched.id);
    res.json({ player: playerLaunched, session: newSession });
  } catch (error) {
    console.error('Errore lancio giocatore:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}