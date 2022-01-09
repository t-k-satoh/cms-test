import type { NextPage, GetStaticProps } from 'next'
import { PromiseType } from 'utility-types'
import { serverSideClient } from '../src/clients/micro-cms/server-side-client'
import { HomeContainer } from '../src/containers/pages/home'
import { NewsRepository } from '../src/data/news'
interface Props {
  news: PromiseType<ReturnType<NewsRepository['getNews']>>
}

const Home: NextPage<Props> = ({ news }) => {
  return <HomeContainer news={news} />
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const newsRepository = new NewsRepository(serverSideClient)

  const news = await newsRepository.getNews()

  return {
    props: {
      news,
    },
  }
}

export default Home
