import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { PromiseType } from 'utility-types'
import { NewsRepository } from '../src/data/news/repository'
import styles from '../styles/Home.module.css'

interface Props {
  news: PromiseType<ReturnType<NewsRepository['getNews']>>
}

const Home: NextPage<Props> = ({ news }) => {
  return (
    <div className={styles.container}>
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
  const newsRepository = new NewsRepository()
  const news = await newsRepository.getNews()

  return {
    props: {
      news,
    },
  }
}

export default Home
