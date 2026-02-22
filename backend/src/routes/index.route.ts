import { Router, type Request, type Response } from 'express';
import authRouter from './auth.route.js';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

router.use('/api/auth', authRouter);

router.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;
