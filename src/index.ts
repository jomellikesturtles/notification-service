// src/index.ts
import express, { Request, Response } from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { startKafkaConsumer } from './kafka.consumer.js';

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 3500;
const PORT = 3500;

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);


// app.use(
//   (

//   ) => {

//   }
// );

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startKafkaConsumer().catch(err => console.error('Kafka consumer startup failed:', err));
});




export interface MessageBody {
  type: TYPE,
  recipient: string,
  body: string,
  subject: string,
  context: any
}

export enum TYPE {
  SMS = 'sms',
  EMAIL = 'email',
  SLACK = 'slack',
  DISCORD = 'discord',
}