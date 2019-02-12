import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

import withApollo from './with-apollo'

const GRAPHQL_URL = 'http://localhost:8888/graphql'

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      connectToDevTools: process.browser,
      link: new HttpLink({
        credentials: 'same-origin',
        uri: GRAPHQL_URL
      })
    })
)
