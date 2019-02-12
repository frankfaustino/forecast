import { ApolloServer } from 'apollo-server-express'
import axios from 'axios'
import * as connectRedis from 'connect-redis'
import { config } from 'dotenv'
import * as express from 'express'
import * as session from 'express-session'
import * as Redis from 'ioredis'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { UserResolver } from './modules/user/UserResolver'

export const main = (async () => {
  config()
  const { APP_ID, APP_SECRET, CLIENT_URI, CLOVER_URI, PORT } = process.env
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
    secret: 'supersecret',
    store: new RedisStore({ client: redis as any })
  })

  const app = express()
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  })

  app.use(sesh)

  const requestAPIToken = async (req: any, res: any) => {
    const url = `${CLOVER_URI}/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${
      req.query.code
    }`
    await axios
      .get(url)
      .then(({ data }) => {
        req.session.access_token = data.access_token
        req.session.save()
        console.log('🥳', req.session, req.sessionID)
        res.redirect(`${CLIENT_URI}/auth_success`)
      })
      .catch(err => {
        console.log('😭️', err)
        res.send(err)
      })
  }

  const authenticate = async (req: any, res: any) => {
    const url = `${CLOVER_URI}/oauth/authorize?client_id=${APP_ID}`
    req.query.code ? await requestAPIToken(req, res) : await res.redirect(url)
  }

  app.get('/auth', (req, res) => authenticate(req, res))

  const cors = {
    credentials: true,
    origin: '*'
  }

  server.applyMiddleware({ app, cors })

  app.listen(PORT, () => console.log(`🤖 Server is listening on port ${PORT}`))
})()
