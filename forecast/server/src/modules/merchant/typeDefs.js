const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Merchant {
    id: String
    authCode: String
    accessToken: String
  }

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

  type Query {
    merchant: Merchant
    inventory: InventoryResponse
  }
`

module.exports = typeDefs
