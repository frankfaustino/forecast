const connectRedis = require('connect-redis')
const session = require('express-session')
const Redis = require('ioredis')

const RedisStore = connectRedis(session)
const redis = new Redis()

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
  store: new RedisStore({ client: redis })
})

module.exports = sesh
