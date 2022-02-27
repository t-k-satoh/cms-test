import * as React from 'react'
import { useQuery } from 'react-query'
import { clientSideClient } from '../../../clients/micro-cms/client-side-client'
import { Home } from '../../../components/pages/home'
import { NewsRepository } from '../../../data/news'

export const HomeContainer: React.VFC = () => {
  const newsRepository = React.useMemo(
    () => new NewsRepository(clientSideClient),
    []
  )
  const getNews = React.useCallback(
    () => newsRepository.getNews(),
    [newsRepository]
  )

  const { data, status } = useQuery('news', getNews)

  return typeof data === 'undefined' ? null : (
    <Home news={data} status={status} />
  )
}
