import connectRedis from 'connect-redis'
import client from './client'

const RedisStore = connectRedis(session)

const store = new RedisStore({ client })

export default store