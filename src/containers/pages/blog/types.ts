import { QueryStatus } from 'react-query'
import { PromiseType } from 'utility-types'
import { NewsRepository } from '../../../data/news'

export interface Props {
  id: string
}

export interface StateToProps {
  news: PromiseType<ReturnType<NewsRepository['getNewsOnID']>>
  status: QueryStatus
}

// export interface DispatchToProps {}
