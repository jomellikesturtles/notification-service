import { Kafka } from 'kafkajs';
import { sendCommunication } from './communication.service.js';
import { MessageBody, TYPE } from './index.js';

const kafkaBroker = 'localhost:9093';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [kafkaBroker]
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

export const handleMessage = async (topic: string, value: string | undefined) => {
  console.log(`Received message on topic "${topic}": ${value}`);
  if (!value) return;

  try {
    const payload = JSON.parse(value);
    const email = payload.email || payload.recipient;
    if (!email) {
      console.error('No email/recipient found in payload:', payload);
      return;
    }

    const messageBody: MessageBody = {
      type: payload.type || TYPE.EMAIL,
      recipient: email,
      body: payload.body || 'Welcome to App',
      subject: payload.subject || 'Welcome to App',
      context: {
        name: payload.name || payload.username || 'User',
        ...payload.context
      }
    };
    console.log('messageBody: ' ,messageBody)

    await sendCommunication(messageBody, 'welcome');
  } catch (err) {
    console.error('Error processing Kafka message:', err);
  }
};

export const startKafkaConsumer = async () => {
  try {
    await consumer.connect();
    console.log(`Kafka Consumer connected to broker: ${kafkaBroker}`);
    
    await consumer.subscribe({ topic: 'user.account.created', fromBeginning: true });
    console.log('Kafka Consumer subscribed to topic: user.account.created');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value?.toString();
        await handleMessage(topic, value);
      },
    });
  } catch (error) {
    console.error('Failed to start Kafka consumer:', error);
  }
};
