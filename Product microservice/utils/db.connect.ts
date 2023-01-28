import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';
require('dotenv').config();

async function connect() {
  const dbUri = process.env.MONGODB_CONNECTION_PRODUCT || '';
  // config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('Db connected');
  } catch (error) {
    logger.error('Could not connect to db');
    console.log(error);
    process.exit(1);
  }
}
export default connect;
