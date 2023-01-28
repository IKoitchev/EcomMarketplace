import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  console.log(uri);
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  const con = await mongoose.connect(`${process.env.MONGO_URI}/mockdb`);
};
