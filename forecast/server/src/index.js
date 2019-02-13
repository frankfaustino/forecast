const { ApolloServer, gql } = require('apollo-server-express')
require('dotenv').config()
const express = require('express')

const { authenticate, sesh } = require('./middleware')
const { resolvers, typeDefs } = require('./modules/merchant')

const main = (async () => {
  const { CLIENT_URI, PORT, APP_ID, APP_SECRET, CLOVER_URI, NODE_ENV } = process.env

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
    console.log(`
      🌍 ${NODE_ENV}\n
      🤖 GraphQL server is running on http://localhost:${PORT}${server.graphqlPath}
    `)
  )
})()

module.exports = main
