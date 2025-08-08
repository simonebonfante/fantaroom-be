import { Router } from 'express';
import { assignSession, declareWinner, getActiveSession, getSession, placeBid, skipSession } from './session.controller';

const router = Router();

router.post('/place-bid', placeBid);
router.post('/skip-session', skipSession);
router.post('/declare-winner', declareWinner);
router.post('/assign-session', assignSession);
router.get('/active', getActiveSession);
router.get('/:id', getSession);

export default router; 