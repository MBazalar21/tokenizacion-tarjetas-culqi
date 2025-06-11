import {config} from 'dotenv';
import { startServer } from './server';
import { connectDatabase } from './infrastructure/database/connection';
import { setupLogger, logger } from './infrastructure/logger';


(async () => {
  try {
    config()
    await connectDatabase();
    setupLogger();

    startServer();
  } catch (error) {
    logger.error(`❌ Error al iniciar la app: ${(error as Error).message}`);
    process.exit(1);
  }
})();
