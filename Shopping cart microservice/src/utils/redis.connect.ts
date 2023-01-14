import * as redis from 'redis';
import type { RedisClientType } from 'redis';
import log from './logger';
require('dotenv').config();

let client: RedisClientType;
const host = process.env.REDIS_HOST || '';
const port = 19763;
const pass = process.env.REDIS_PASS || '';

export default async function redisConnect() {
  try {
    client = redis.createClient({
      socket: {
        host: host,
        port: 19763,
      },
      password: pass,
    });
    await client.connect();

    log.info('Redis connected');
  } catch (error) {
    log.error('Could not connect to Redis');
  }
}

export async function addToDeletedList(key: string, value: string) {
  try {
    const res = await client.set(key, value);
    log.info(`${key} added to deleted products list`);
    await client.del(key);
    return res;
  } catch (error: any) {
    log.error(error);
  }
}

export async function isDeleted(hash: string) {
  try {
    const res = await client.get(hash);
    if (!res) {
      return false;
    }
    return true;
  } catch (error: any) {
    log.error(error);
    return false;
  }
}
