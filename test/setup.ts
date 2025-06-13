// test/setup.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  console.log('🧪 Iniciando Mongo Memory Server...');
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    dbName: 'culqiapptest',
  });
  console.log('✅ Conectado a MongoDB en memoria');
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// afterAll(async () => {
//   console.log('🧹 Cerrando conexión y MongoDB en memoria...');
//   // await mongoose.connection.dropDatabase();
//   // await mongoose.connection.close();
//   // await mongoServer.stop();
//   if (mongoose.connection.readyState !== 0) {
//     await mongoose.disconnect();
//   }
// });
