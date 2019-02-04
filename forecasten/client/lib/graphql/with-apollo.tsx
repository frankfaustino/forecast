import { ApolloClient } from 'apollo-boost'
import { AppProps, default as NextApp, DefaultAppIProps } from 'next/app'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import { getDataFromTree } from 'react-apollo'

import {
  ApolloContext,
  InitApolloClient,
  WithApolloOptions,
  WithApolloProps,
  WithApolloState
} from '../types'
import initApollo from './init-apollo'

const SSR = !process.browser

const getDisplayName = (Component: React.ComponentType<any>) =>
  Component.displayName || Component.name || 'Unknown'

export default function withApollo<TCache = any>(
  client: InitApolloClient<TCache>,
  options: WithApolloOptions = {}
) {
  type ApolloProps = WithApolloProps<TCache>

  if (!options.getDataFromTree) {
    options.getDataFromTree = 'always'
  }

  return (App: typeof NextApp) =>
    class WithApollo extends React.Component<ApolloProps & AppProps & DefaultAppIProps> {
      public static displayName = `WithApollo(${getDisplayName(App)})`

      public static propTypes = {
        apollo: PropTypes.object,
        apolloState: PropTypes.object
      }

      public static getInitialProps = async (appCtx: ApolloContext) => {
        const { Component, router, ctx } = appCtx
        const headers = ctx.req ? ctx.req.headers : {}
        const apollo = initApollo<TCache>(client, { ctx, headers })
        const apolloState: WithApolloState<TCache> = {}
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

      public apollo: ApolloClient<TCache>

      constructor(props: ApolloProps & AppProps & DefaultAppIProps) {
        super(props)

        this.apollo = initApollo<TCache>(client, {
          initialState: props.apolloState.data
        })
      }

      public render() {
        return <App {...this.props} apollo={this.apollo} />
      }
    }
}

