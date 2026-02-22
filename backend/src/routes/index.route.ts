import { Router, type Request, type Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

export default router;
