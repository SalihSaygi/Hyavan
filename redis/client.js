import Redis from 'ioredis';
import { REDIS_OPTIONS } from '../config/session';

const client = new Redis(REDIS_OPTIONS);

export default client;
