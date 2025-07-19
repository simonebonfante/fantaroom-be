import { Router } from 'express';
import playerRoutes from '../module/player/player.route';
import userRoutes from '../module/user/user.route';
import sessionRoutes from '../module/session/session.route';
// quando aggiungerai altri router, importa qui

const router = Router();

router.use('/players', playerRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);

export default router;
