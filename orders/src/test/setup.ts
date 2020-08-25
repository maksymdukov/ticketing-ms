import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const email = 'test@test.com';

  const token = jsonwebtoken.sign({ id, email }, process.env.JWT_KEY!);
  const cookieValue = { jwt: token };
  const cookieValueBase64 = Buffer.from(JSON.stringify(cookieValue)).toString(
    'base64'
  );
  const cookie = `express:sess=${cookieValueBase64}`;

  return [cookie];
};
