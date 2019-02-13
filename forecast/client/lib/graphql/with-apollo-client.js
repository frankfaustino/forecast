import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'

const GRAPHQL_URL = 'http://localhost:8888/graphql'

export default withApollo(
  ({ headers }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      request: async operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          },
          headers
        })
      }
    })
)
