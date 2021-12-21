import { microCmsClient } from '../../clients'
import { News } from './api-interfaces'
import { END_POINT } from './constants'
import { NewsRepositoryInterface } from './repository-interfaces'

export class NewsRepository implements NewsRepositoryInterface {
  public getNews: NewsRepositoryInterface['getNews'] = async (queries) => {
    const data = await microCmsClient.getList<News>({
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
    const data = await microCmsClient.getListDetail<News>({
      endpoint: END_POINT,
      contentId: id,
      queries,
    })

    return data
  }
}
