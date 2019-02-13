const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Merchant {
    id: String
    authCode: String
    accessToken: String
  }

  type Query {
    merchant: Merchant
  }
`

module.exports = typeDefs
