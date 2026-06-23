// src/index.ts
import express, { Request, Response } from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { startKafkaConsumer } from './kafka.consumer.js';
import * as actuator from 'express-actuator';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 3500;
const PORT = 3500;

const actuatorMiddleware = (actuator as any).default
  ? (actuator as any).default({ basePath: '/actuator' })
  : (actuator as any)({ basePath: '/actuator' });

app.use(actuatorMiddleware);
app.use('/api', actuatorMiddleware);
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Custom Actuator Ping Endpoint
// app.get('/actuator/ping', (req, res) => {
//   res.status(200).json({
//     status: 'UP',
//     timestamp: new Date().toISOString()
//   });
// });

// // Alternative standard health check route
// app.get('/actuator/health', (req, res) => {
//   // You can inject DB or Redis connection checks here
//   const isDatabaseUp = true; 

//   if (!isDatabaseUp) {
//     return res.status(503).json({ status: 'DOWN' });
//   }

//   res.status(200).json({ status: 'UP' });
// });

app.use(routes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startKafkaConsumer().catch(err => console.error('Kafka consumer startup failed:', err));
});




export interface MessageBody {
  type: TYPE,
  recipient: string,
  body: string,
  subject: string,
  context: any;
}

export enum TYPE {
  SMS = 'sms',
  EMAIL = 'email',
  SLACK = 'slack',
  DISCORD = 'discord',
}