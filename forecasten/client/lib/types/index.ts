import ApolloClient from 'apollo-client'
import { IncomingHttpHeaders } from 'http'
import { NextContext } from 'next'
import { AppComponentContext, AppComponentProps } from 'next/app'

declare global {
  namespace NodeJS {
    interface Process {
      browser?: boolean
    }
    interface Global {
      fetch: any
    }
  }
}

export interface DocumentProps {
  styleTags: string
}

export interface WithApolloOptions {
  getDataFromTree?: 'always' | 'never' | 'ssr'
}

export interface WithApolloState<TCache> {
  data?: TCache
}

export interface WithApolloProps<TCache> extends AppComponentProps {
  apollo: ApolloClient<TCache>
  apolloState: WithApolloState<TCache>
}

export interface InitApolloOptions<TCache> {
  ctx?: AppContext
  headers?: IncomingHttpHeaders
  initialState?: TCache
}

export type InitApolloClient<TCache> = (options: InitApolloOptions<TCache>) => ApolloClient<TCache>

export interface AppContext extends NextContext {
  apolloClient: ApolloClient<any>
}

export interface ApolloContext extends AppComponentContext {
  ctx: AppContext
}

export type AppGetInitialProps = (
  ctx: ApolloContext
) => Promise<{
  pageProps: any
  [key: string]: any
}>
