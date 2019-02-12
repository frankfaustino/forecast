const { ApolloServer } = require('apollo-server-express')
const axios = require('axios')
const connectRedis = require('connect-redis')
const { config } = require('dotenv')
const express = require('express')
const session = require('express-session')
const Redis = require('ioredis')

const main = (async () => {
  config()
  const { CLIENT_URI, PORT, PROD_APP_ID, PROD_APP_SECRET, PROD_CLOVER_URI } = process.env
  // const { APP_ID, APP_SECRET, CLIENT_URI, CLOVER_URI, PORT, PROD_APP_ID, PROD_APP_SECRET, PROD_CLOVER_URI } = process.env
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
    store: new RedisStore({ client: redis })
  })

  const app = express()
  // const server = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [MerchantResolver]
  //   })
  // })

  app.use(sesh)

  const requestAPIToken = async (req, res) => {
    const url = `${PROD_CLOVER_URI}/oauth/token?client_id=${PROD_APP_ID}&client_secret=${PROD_APP_SECRET}&code=${
      req.query.code
    }`

    if (req.session && req.query) {
      // Save response from Clover OAuth to session
      Object.assign(req.session, req.query)
    }

    await axios
      .get(url)
      .then(({ data }) => {
        req.session.access_token = data.access_token
        req.session.save()
        console.log('🥳', data, req.query, req.session, req.sessionID)

        res.redirect(`${CLIENT_URI}/auth_success`)
      })
      .catch(err => {
        console.log('😭️', err)
        res.send(err)
      })
  }

  const authenticate = async (req, res) => {
    const url = `${PROD_CLOVER_URI}/oauth/authorize?client_id=${PROD_APP_ID}`
    req.query.code ? await requestAPIToken(req, res) : await res.redirect(url)
  }

  app.get('/auth', (req, res) => authenticate(req, res))

  app.get('/inventory', async (req, res) => {
    const { access_token, merchant_id } = req.session
    const url = `${PROD_CLOVER_URI}/v3/merchants/${merchant_id}/items?access_token=${access_token}`
    const response = await axios.get(url).catch(err => console.log('🐛', err.message))
    if (response && response.data) {
      res.json(response.data)
    }
  })

  const cors = {
    credentials: true,
    origin: '*'
  }

  // server.applyMiddleware({ app, cors })

  app.listen(PORT, () => console.log(`🤖 Server is listening on port ${PORT}`))
})()

module.exports = main
