import { QueryStatus } from 'react-query'
import { PromiseType } from 'utility-types'
import { NewsRepository } from '../../../data/news'

export interface StateToProps {
  news: PromiseType<ReturnType<NewsRepository['getNews']>>
  status: QueryStatus
}

// export interface DispatchToProps {}
