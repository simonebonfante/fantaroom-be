import { Router } from 'express';
import { getAllPlayers, getAvailablePlayers, getPlayerById, launchPlayer } from './player.controller';

const router = Router();

router.get('/', getAllPlayers);
router.get('/available', getAvailablePlayers);
router.get('/:id', getPlayerById);
router.post('/launch', launchPlayer);

export default router; 