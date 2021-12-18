import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { PromiseType } from 'utility-types'
import { NewsRepository } from '../../src/data/news/repository'

interface Props {
  news: PromiseType<ReturnType<NewsRepository['getNewsOnID']>>
}

const Blog: NextPage<Props> = ({ news }) => {
  return <div>{JSON.stringify(news)}</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRepository = new NewsRepository()
  const news = await newsRepository.getNews()

  const paths = news.items.map((item) => `/blog/${item.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  Props,
  { id: string; slug: string },
  { draftKey: string }
> = async (context) => {
  const newsRepository = new NewsRepository()

  if (
    context.preview &&
    typeof context.params !== 'undefined' &&
    typeof context.previewData !== 'undefined'
  ) {
    const contentId = context.params.id
    const draftKey = context.previewData.draftKey

    const news = await newsRepository.getNewsOnID(contentId, { draftKey })

    return {
      props: {
        news,
        fallback: false,
      },
    }
  }

  const id = context.params?.id
  const news = await newsRepository.getNewsOnID(id ?? '')

  return {
    props: {
      news,
    },
  }
}

export default Blog
