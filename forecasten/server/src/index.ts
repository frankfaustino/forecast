import { ApolloServer } from 'apollo-server-express'
import { config } from 'dotenv'
import * as express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { UserResolver } from './modules/user/UserResolver'

export const main = (async () => {
  config()
  const { PORT } = process.env
  const app = express()
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  })

  server.applyMiddleware({ app })

  app.listen(PORT, () => console.log(`🤖 Server is listening on port ${PORT}`))
})()
