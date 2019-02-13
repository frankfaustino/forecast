import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const QUERY = gql`
  query {
    merchant {
      id
      authCode
      accessToken
    }
  }
`

const Dashboard = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading'
      if (error) return `Error! ${error.message}`

      return <div>Dashboard</div>
    }}
  </Query>
)

export default Dashboard
