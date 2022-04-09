import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
  HydrateProps,
} from 'react-query'
import { GlobalStyle } from '../src/styles/global'

const ExpansionQueryClientProvider: React.FC<
  QueryClientProviderProps & { children: React.ReactNode }
> = QueryClientProvider

const ExpansionHydrate: React.FC<HydrateProps & { children: React.ReactNode }> =
  Hydrate

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ExpansionQueryClientProvider client={queryClient}>
      <ExpansionHydrate state={pageProps.dehydratedState}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {/* @ts-ignore */}
        <GlobalStyle />
        <Component {...pageProps} />
      </ExpansionHydrate>
    </ExpansionQueryClientProvider>
  )
}

export default App
