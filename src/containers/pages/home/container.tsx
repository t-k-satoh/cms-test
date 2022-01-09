import * as React from 'react'
import { useQuery } from 'react-query'
import { clientSideClient } from '../../../clients/micro-cms/client-side-client'
import { Home } from '../../../components/pages/home'
import { NewsRepository } from '../../../data/news'
import { Props } from './types'

export const HomeContainer: React.VFC<Props> = (props) => {
  const newsRepository = new NewsRepository(clientSideClient)
  const getNews = React.useCallback(() => newsRepository.getNews(), [])

  const { data, status } = useQuery('news', getNews, {
    initialData: props.news,
  })

  return typeof data === 'undefined' ? null : (
    <Home news={data} status={status} />
  )
}
