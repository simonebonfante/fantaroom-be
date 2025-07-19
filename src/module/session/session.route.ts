import { Router } from 'express';
import { declareWinner, getActiveSession, getSession, placeBid } from './session.controller';

const router = Router();

router.post('/place-bid', placeBid);
router.post('/declare-winner', declareWinner);
router.get('/active', getActiveSession);
router.get('/:id', getSession);

export default router; 