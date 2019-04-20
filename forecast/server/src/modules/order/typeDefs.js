const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Order {
    id: String
    currency: String
    employee: Employee
    taxRemoved: Boolean
    isVat: Boolean
    manualTransaction: Boolean
    groupLineItems: Boolean
    testMode: Boolean
  }

  extend type Query {
    order: Order
  }
`

module.exports = typeDefs
