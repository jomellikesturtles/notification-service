import dotenv from 'dotenv';
dotenv.config();

// Fail fast if a critical variable is missing
if (!process.env.DATABASE_URL) {
  throw new Error("CRITICAL ERROR: DATABASE_URL is not defined.");
}

export const config = {
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  KAFKA_BROKER: process.env.KAFKA_BROKER
};
