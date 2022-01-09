import { createClient } from 'microcms-js-sdk'
import { News } from './api-interfaces'
import { END_POINT } from './constants'
import { NewsRepositoryInterface } from './repository-interfaces'

export class NewsRepository implements NewsRepositoryInterface {
  private client: ReturnType<typeof createClient>

  constructor(client: ReturnType<typeof createClient>) {
    this.client = client
  }

  public getNews: NewsRepositoryInterface['getNews'] = async (queries) => {
    const data = await this.client.getList<News>({
      endpoint: END_POINT,
      queries,
    })

    return {
      items: data.contents,
    }
  }
  public getNewsOnID: NewsRepositoryInterface['getNewsOnID'] = async (
    id,
    queries
  ) => {
    const data = await this.client.getListDetail<News>({
      endpoint: END_POINT,
      contentId: id,
      queries,
    })

    return data
  }
}
