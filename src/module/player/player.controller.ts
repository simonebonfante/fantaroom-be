import { Request, Response } from 'express';
import Player from '../../models/Player';
import Session from '../../models/Session';
import { startNewSession } from '../session/session.controller';

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

export async function launchPlayer(_: Request, res: Response) {
  try {
    const activeSession = await Session.findOne({ where: { isActive: true } });
    if (!activeSession) {
      return res.status(404).json({ error: 'Nessuna sessione attiva trovata' });
    }
    let playerLaunched: Player | null = null;
    const players = await Player.findAll({ where: { taken: false } });
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
    res.json({ player: playerLaunched, session: newSession });
  } catch (error) {
    console.error('Errore lancio giocatore:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}