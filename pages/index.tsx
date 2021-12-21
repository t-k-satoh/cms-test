import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { PromiseType } from 'utility-types'
import { newsRepository } from '../src/data/news'
interface Props {
  news: PromiseType<ReturnType<typeof newsRepository['getNews']>>
}

const Home: NextPage<Props> = ({ news }) => {
  return (
    <div>
      {news.items.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/blog/${id}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const news = await newsRepository.getNews()

  return {
    props: {
      news,
    },
  }
}

export default Home
