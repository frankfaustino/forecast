import { ApolloClient } from 'apollo-boost'
import * as fetch from 'isomorphic-unfetch'

let apolloClient

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) global.fetch = fetch

const getClient = (clientFn, options = {}) => {
  if (typeof clientFn !== 'function') {
    throw new Error('[withApollo] requires a function that returns an ApolloClient')
  }
  const client = clientFn(options)
  if (options.initialState) client.cache.restore(options.initialState)

  return client
}

const initApollo = (clientFn, options) => {
  if (!clientFn) {
    throw new Error(
      '[withApollo] the first param is missing and is required to get the ApolloClient'
    )
  }

  // Creates a new client for every server-side request so data isn't shared between connections
  if (!process.browser) {
    return getClient(clientFn, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = getClient(clientFn, options)
  }

  return apolloClient
}

export default initApollo
