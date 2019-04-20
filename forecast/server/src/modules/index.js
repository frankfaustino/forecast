const { makeExecutableSchema } = require('apollo-server-express')

const { resolvers: inventoryResolvers, typeDefs: inventoryTypeDefs } = require('./inventory')
const { resolvers: merchantResolvers, typeDefs: merchantTypeDefs } = require('./merchant')
const { resolvers: orderResolvers, typeDefs: orderTypeDefs } = require('./order')
const { resolvers: paymentResolvers, typeDefs: paymentTypeDefs } = require('./payment')

const resolvers = {
  Query: {
    ...inventoryResolvers,
    ...merchantResolvers,
    ...orderResolvers,
    ...paymentResolvers
  }
}

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs: [inventoryTypeDefs, merchantTypeDefs, orderTypeDefs, paymentTypeDefs]
})
