import { ApolloClient } from 'apollo-boost'
import * as fetch from 'isomorphic-unfetch'

import { InitApolloClient, InitApolloOptions } from '../types'

let apolloClient: ApolloClient<any>

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) global.fetch = fetch

const getClient = <TCache = any>(
  clientFn: InitApolloClient<TCache>,
  options: InitApolloOptions<TCache> = {}
) => {
  if (typeof clientFn !== 'function') {
    throw new Error('[withApollo] requires a function that returns an ApolloClient')
  }
  const client = clientFn(options)
  if (options.initialState) client.cache.restore(options.initialState)

  return client
}

const initApollo = <TCache = any>(
  clientFn: InitApolloClient<TCache>,
  options: InitApolloOptions<TCache>
): ApolloClient<TCache> => {
  if (!clientFn) {
    throw new Error(
      '[withApollo] the first param is missing and is required to get the ApolloClient'
    )
  }

  // Creates a new client for every server-side request so data isn't shared between connections
  if (!process.browser) {
    return getClient<TCache>(clientFn, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = getClient<TCache>(clientFn, options)
  }

  return apolloClient
}

export default initApollo
