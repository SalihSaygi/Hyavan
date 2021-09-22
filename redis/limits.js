import RateLimit from 'express-rate-limit'
import SlowDown from "express-slow-down"
import RedisRateStore from 'rate-limit-redis'
import client from './client'

const limiter = new RateLimit({
    store: new RedisRateStore({
        client: client
    }),
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
})
const speedLimiter = new SlowDown({
    store: new RedisRateStore({
        client: client
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 10, // allow 10 requests per 15 minutes, then...
    delayMs: 333, // begin adding 1/3s of delay per request above 100:
    maxDelayMs: 5000 // max 5 seconds delay
})

export { limiter, speedLimiter }