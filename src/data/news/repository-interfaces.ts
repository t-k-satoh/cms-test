import type { MicroCMSQueries } from 'microcms-js-sdk'
import { News } from './entity-interfaces'

export interface NewsRepositoryInterface {
  getNews: (queries?: MicroCMSQueries) => Promise<{ items: News[] }>
  getNewsOnID: (id: News['id'], queries?: MicroCMSQueries) => Promise<News>
}
