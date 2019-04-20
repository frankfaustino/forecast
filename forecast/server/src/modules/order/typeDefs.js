const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type IdObject {
    id: String
  }

  type LineItem {
    orderRef: IdObject
    item: IdObject
    name: String
    price: Int
  }

  type LineItems {
    elements: [LineItem]
  }

  type Order {
    id: String
    currency: String
    employee: Employee
    taxRemoved: Boolean
    isVat: Boolean
    manualTransaction: Boolean
    groupLineItems: Boolean
    testMode: Boolean
    state: String
    total: Int
    lineItems: LineItems
  }

  type OrderResponse {
    elements: [Order]
  }

  extend type Query {
    order: OrderResponse
  }
`

module.exports = typeDefs
