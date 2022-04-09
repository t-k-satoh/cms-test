import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideClient } from '../src/clients/micro-cms/server-side-client'
import { HomeContainer } from '../src/containers/pages/home'
import { NewsRepository } from '../src/data/news'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DZ works</title>
      </Head>
      <HomeContainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  const newsRepository = new NewsRepository(serverSideClient)

  await queryClient.prefetchQuery('news', () => newsRepository.getNews())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
