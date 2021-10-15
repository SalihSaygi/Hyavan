import Redis from 'ioredis';
import { DEV_REDIS_OPTIONS } from '../config/redis';

const client = new Redis(DEV_REDIS_OPTIONS);

export default client;
