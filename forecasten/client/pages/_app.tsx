import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import withApollo from '../lib/graphql/with-apollo-client'
import { WithApolloProps } from '../lib/types'

class Root extends App<WithApolloProps<{}>, {}> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(Root)