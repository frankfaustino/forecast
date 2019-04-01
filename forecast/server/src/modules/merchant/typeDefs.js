const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Device {
    href: String
    id: String
    model: String
    serial: String
    secureId: String
    buildType: String
    deviceTypeName: String
  }

  type Merchant {
    id: String
    authCode: String
    accessToken: String
    devices: [Device]
  }

  type Query {
    merchant: Merchant
  }
`

module.exports = typeDefs
