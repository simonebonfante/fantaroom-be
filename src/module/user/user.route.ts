import { Router } from 'express';
import { getAllUsers, getUserById, createUser, getMeOrCreate } from './user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/me', getMeOrCreate);

export default router; 