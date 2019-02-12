import { ApolloClient } from 'apollo-boost'
import { AppProps, default as NextApp } from 'next/app'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import { getDataFromTree } from 'react-apollo'

import initApollo from './init-apollo'

const SSR = !process.browser

const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Unknown'

export default function withApollo(client, options = {}) {
  if (!options.getDataFromTree) {
    options.getDataFromTree = 'always'
  }

  return (App) =>
    class WithApollo extends React.Component {
      static displayName = `WithApollo(${getDisplayName(App)})`

      static propTypes = {
        apollo: PropTypes.object,
        apolloState: PropTypes.object
      }

      static getInitialProps = async (appCtx) => {
        const { Component, router, ctx } = appCtx
        const headers = ctx.req ? ctx.req.headers : {}
        const apollo = initApollo(client, { ctx, headers })
        const apolloState = {}
        const getInitialProps = App.getInitialProps

        let appProps = { pageProps: {} }

        if (getInitialProps) {
          ctx.apolloClient = apollo
          appProps = await getInitialProps(appCtx)
        }

        if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
          return {}
        }

        if (options.getDataFromTree === 'always' || (options.getDataFromTree === 'ssr' && SSR)) {
          try {
            await getDataFromTree(
              <App
                {...appProps}
                Component={Component}
                router={router}
                apolloState={apolloState}
                apollo={apollo}
              />
            )
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error('GraphQL error occurred [getDataFromTree]', error)
            }
          }

          if (SSR) {
            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind()
          }

          apolloState.data = apollo.cache.extract()
        }

        return { ...appProps, apolloState }
      }

      apollo

      constructor(props) {
        super(props)

        this.apollo = initApollo(client, {
          initialState: props.apolloState.data
        })
      }

      render() {
        return <App {...this.props} apollo={this.apollo} />
      }
    }
}

