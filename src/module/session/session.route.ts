import { Router } from 'express';
import { declareWinner, getActiveSession, getSession, placeBid, skipSession } from './session.controller';

const router = Router();

router.post('/place-bid', placeBid);
router.post('/skip-session', skipSession);
router.post('/declare-winner', declareWinner);
router.get('/active', getActiveSession);
router.get('/:id', getSession);

export default router; 