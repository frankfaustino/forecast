const { ApolloServer, gql } = require('apollo-server-express')
const axios = require('axios')
require('dotenv').config()
const express = require('express')

const sesh = require('./middleware/session')
const { resolvers, typeDefs } = require('./modules/merchant')

const main = (async () => {
  const { CLIENT_URI, PORT, APP_ID, APP_SECRET, CLOVER_URI } = process.env

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  })

  app.use(sesh)

  const requestAPIToken = async (req, res) => {
    try {
      const url = `${CLOVER_URI}/oauth/token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${
        req.query.code
      }`

      if (req.session && req.query) {
        // Save response from Clover OAuth to session
        Object.assign(req.session, req.query)
      }

      const { data } = await axios.get(url)

      if (data) {
        req.session.access_token = data.access_token
        req.session.save()
        console.log('🥳', data)
        console.log('🥳', req.query)
        console.log('🥳', req.session)
        console.log('🥳', req.sessionID)
        console.log('🥳', req.headers)

        res.redirect(`${CLIENT_URI}/auth_success`)
      }
    } catch (err) {
      console.error('😭️', err)
      res.send(err)
    }
  }

  const authenticate = async (req, res) => {
    const url = `${CLOVER_URI}/oauth/authorize?client_id=${APP_ID}`
    req.query.code ? await requestAPIToken(req, res) : await res.redirect(url)
  }

  app.get('/auth', (req, res) => authenticate(req, res))

  app.get('/inventory', async (req, res) => {
    const { access_token, merchant_id } = req.session
    const url = `${CLOVER_URI}/v3/merchants/${merchant_id}/items?access_token=${access_token}`
    const response = await axios.get(url).catch(err => console.log('🐛', err.message))
    if (response && response.data) {
      res.json(response.data)
    }
  })

  const cors = {
    credentials: true,
    origin: CLIENT_URI
  }

  server.applyMiddleware({ app, cors })

  app.listen(PORT, () => console.log(`🤖 Server is listening on port ${PORT}`))
})()

module.exports = main
