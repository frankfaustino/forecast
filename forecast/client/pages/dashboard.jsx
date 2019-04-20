import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

const QUERY = gql`
  query {
    merchant {
      id
      authCode
      accessToken
      devices {
        href
        id
        model
        serial
      }
    }
  }
`

const Dashboard = () => (
  <Query query={QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading'
      if (error) return `Error! ${error.message}`

      const { accessToken, authCode, devices, id } = data.merchant

      return (
        <>
          <div>
            <p>Merchant ID: {id}</p>
            <p>Access Token: {accessToken}</p>
            <p>Auth Code: {authCode}</p>
            {devices && devices.map(({ href, id, model, serial }) => (
              <div style={{ border: "1px solid green" }}>
                <p>{href}</p>
                <p>{id}</p>
                <p>{model}</p>
                <p>{serial}</p>
              </div>))}
          </div>
          <Link href="/inventory">Inventory</Link>
        </>
      )
    }}
  </Query>
)

export default Dashboard
