const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Tender {
    href: String
    id: String
  }

  type Employee {
    id: String
  }

  type Payment {
    id: String
    order: Order
    tender: Tender
    amount: Int
    taxAmount: Int
    employee: Employee
    createdTime: Float
    clientCreatedTime: Float
    modifiedTime: Float
  }

  type PaymentResponse {
    elements: [Payment]
    href: String
  }

  extend type Query {
    payments: PaymentResponse
  }
`

module.exports = typeDefs
