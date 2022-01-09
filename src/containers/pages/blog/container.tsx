import * as React from 'react'
import { useQuery } from 'react-query'
import { clientSideClient } from '../../../clients/micro-cms/client-side-client'
import { Blog } from '../../../components/pages/blog'
import { NewsRepository } from '../../../data/news'
import { Props } from './types'

export const BlogContainer: React.VFC<Props> = (props) => {
  const { news } = props

  const newsRepository = React.useMemo(
    () => new NewsRepository(clientSideClient),
    []
  )
  const getNewsOnID = React.useCallback(
    () => newsRepository.getNewsOnID(news.id),
    [newsRepository, news.id]
  )

  const { data, status, isLoading, remove } = useQuery(
    'news_on_id',
    getNewsOnID,
    {
      initialData: news,
    }
  )

  React.useEffect(() => () => remove(), [remove])

  return typeof data === 'undefined' ? null : (
    <>
      {isLoading ? '?' : 'i'}
      <Blog news={data} status={status} />
    </>
  )
}
