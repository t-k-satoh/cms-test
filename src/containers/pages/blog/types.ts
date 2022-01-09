import { QueryStatus } from 'react-query'
import { PromiseType } from 'utility-types'
import { NewsRepository } from '../../../data/news'

export interface Props {
  news: PromiseType<ReturnType<NewsRepository['getNewsOnID']>>
}

export interface StateToProps {
  news: Props['news']
  status: QueryStatus
}

// export interface DispatchToProps {}
