import { Request, Response } from 'express';
import User from '../../models/User';

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Errore caricamento utenti:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    console.error('Errore caricamento utente:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}

export async function getMeOrCreate(req: Request, res: Response) {
    try {
      const user = await User.findOne({ where: { name: req.body.name } });
      if (!user) {
        return createUser(req, res);
      }
      res.json(user);
    } catch (error) {
      console.error('Errore caricamento utente:', error);
      res.status(500).json({ error: 'Errore server' });
    }
  }

export async function createUser(req: Request, res: Response) {
  try {
    const { name, isAdmin = false } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name richiesto' });
    }
    const newUser = await User.create({ name, isAdmin });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Errore creazione utente:', error);
    res.status(500).json({ error: 'Errore server' });
  }
}
