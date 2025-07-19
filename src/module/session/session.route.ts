import { Router } from 'express';
import { declareWinner, getSession, placeBid, startNewSession } from './session.controller';

const router = Router();

router.post('/start-new-session', startNewSession);
router.post('/place-bid', placeBid);
router.post('/declare-winner', declareWinner);
router.get('/:id', getSession);

export default router; 