import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideClient } from '../../src/clients/micro-cms/server-side-client'
import { BlogContainer } from '../../src/containers/pages/blog'
import { NewsRepository } from '../../src/data/news/repository'

const Blog: NextPage<{ id: string }> = ({ id }) => <BlogContainer id={id} />

export const getStaticPaths: GetStaticPaths = async () => {
  const newsRepository = new NewsRepository(serverSideClient)
  const news = await newsRepository.getNews()

  const paths = news.items.map((item) => `/blog/${item.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<
  { id: string },
  { id: string; slug: string },
  { draftKey: string }
> = async (context) => {
  const newsRepository = new NewsRepository(serverSideClient)

  if (
    context.preview &&
    typeof context.params !== 'undefined' &&
    typeof context.previewData !== 'undefined'
  ) {
    const contentId = context.params.id
    const draftKey = context.previewData.draftKey
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('posts', () =>
      newsRepository.getNewsOnID(contentId, { draftKey })
    )

    return {
      props: {
        id: contentId,
        dehydratedState: dehydrate(queryClient),
        fallback: false,
      },
    }
  }

  const id = context.params?.id ?? ''

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('posts', () => newsRepository.getNewsOnID(id))

  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Blog
