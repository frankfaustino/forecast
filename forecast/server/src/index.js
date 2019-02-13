const { ApolloServer, gql } = require('apollo-server-express')
require('dotenv').config()
const express = require('express')

const { authenticate, sesh } = require('./middleware')
const schema = require('./modules')

const main = (async () => {
  const { CLIENT_URI, NODE_ENV, PORT } = process.env

  const app = express()

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req })
  })

  app.use(sesh)

  app.get('/auth', (req, res) => authenticate(req, res))

  const cors = {
    credentials: true,
    origin: CLIENT_URI
  }

  server.applyMiddleware({ app, cors })

  app.listen(PORT, () =>
    console.log(
      `🌍 ${NODE_ENV}\n🤖 GraphQL server is running on http://localhost:${PORT}${
        server.graphqlPath
      }`
    )
  )
})()

module.exports = main
