const { makeExecutableSchema } = require('apollo-server-express')

const { resolvers: merchantResolvers, typeDefs: merchantTypeDefs } = require('./merchant')
const { resolvers: paymentResolvers, typeDefs: paymentTypeDefs } = require('./payment')
const { resolvers: inventoryResolvers, typeDefs: inventoryTypeDefs } = require('./inventory')

const resolvers = {
  Query: {
    ...inventoryResolvers,
    ...merchantResolvers,
    ...paymentResolvers
  }
}

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs: [inventoryTypeDefs, merchantTypeDefs, paymentTypeDefs]
})
