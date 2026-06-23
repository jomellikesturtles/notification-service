import { Request, Response, Router } from "express";
import { sendCommunication } from './communication.service.js';

const actuatorRouter = Router();

actuatorRouter.post('/welcome', (req: Request, res: Response) => {
  console.log('body:', req.body);
  sendCommunication(req.body, 'welcome');
  res.send('Hello from Express and TypeScript!');
});

actuatorRouter.post('/otp', (req: Request, res: Response) => {
  console.log('body:', req.body);
  sendCommunication(req.body, 'otp');

  res.send('Hello from Express and TypeScript!');
});

export default actuatorRouter;