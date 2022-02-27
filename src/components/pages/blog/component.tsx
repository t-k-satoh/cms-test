import Head from 'next/head'
import * as React from 'react'
import { Props } from './types'

export const Blog: React.VFC<Props> = (props) => {
  const { news, status } = props

  return (
    <>
      {status}
      <Head>
        <title>{news.title}</title>
      </Head>
      {JSON.stringify(news)}
    </>
  )
}
