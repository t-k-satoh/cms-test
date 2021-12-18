import { microCmsClient } from '../../clients'
import { News } from './api-interfaces'
import { NewsRepositoryInterface } from './repository-interfaces'

export class NewsRepository implements NewsRepositoryInterface {
  public getNews: NewsRepositoryInterface['getNews'] = async (queries) => {
    const data = await microCmsClient.getList<News>({
      endpoint: 'news',
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
      endpoint: 'news',
      contentId: id,
      queries,
    })

    return data
  }
}
