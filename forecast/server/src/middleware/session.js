const connectRedis = require('connect-redis')
const session = require('express-session')
const Redis = require('ioredis')

const RedisStore = connectRedis(session)
const redis = new Redis()
const store = new RedisStore({ client: redis })

redis.on('connect', () => console.log('🔮 redis-server is connected'))
redis.on('error', () => {
  console.log('❌ Please start redis-server')
  redis.quit()
})

const sesh = session({
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
    secure: process.env.NODE_ENV === 'production'
  },
  name: 'qid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store
})

module.exports = sesh
