// src/infrastructure/database/connection.ts
import mongoose from 'mongoose';
import { logger } from '../logger';
import dotenv from 'dotenv';

dotenv.config();
export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGO_URI!;
    
  try {
    await mongoose.connect(uri);
    logger.info('✅ Mongoose conectado correctamente');
  } catch (error) {
    logger.error('❌ Error al conectar con Mongoose', error);
    throw error;
  }
};
