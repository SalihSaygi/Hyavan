import dotenv from 'dotenv';
dotenv.config();

const { PROD_REDIS_PORT, PROD_REDIS_HOST, PROD_REDIS_PASSWORD } = process.env;

const { DEV_REDIS_PORT, DEV_REDIS_HOST, DEV_REDIS_PASSWORD } = process.env;

const PROD_REDIS_PORT_N = parseInt(PROD_REDIS_PORT);
const DEV_REDIS_PORT_N = parseInt(DEV_REDIS_PORT);

export const PROD_REDIS_OPTIONS = {
  port: PROD_REDIS_PORT_N,
  host: PROD_REDIS_HOST,
  password: PROD_REDIS_PASSWORD,
  retry_strategy: () => 1000,
};
export const DEV_REDIS_OPTIONS = {
  port: DEV_REDIS_PORT_N,
  host: DEV_REDIS_HOST,
  password: DEV_REDIS_PASSWORD,
  retry_strategy: () => 1000,
};
