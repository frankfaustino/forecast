const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Item {
    id: String
    name: String
    sku: String
    modifiedTime: Float
    price: Int
    cost: Int
  }

  type InventoryResponse {
    elements: [Item]
    href: String
  }

  extend type Query {
    inventory: InventoryResponse
  }
`

module.exports = typeDefs
