import { Request, Response, Router } from "express";
import { sendCommunication } from './communication.service.js';

const router = Router();

router.post('/welcome', (req: Request, res: Response) => {
  console.log('body:', req.body);
  sendCommunication();
  res.send('Hello from Express and TypeScript!');
});


router.post('/otp', (req: Request, res: Response) => {
  console.log('body:', req.body);
  sendCommunication();

  res.send('Hello from Express and TypeScript!');
});

export default router;