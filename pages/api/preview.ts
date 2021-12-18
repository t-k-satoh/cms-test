import type { NextApiRequest, NextApiResponse } from 'next'
import { NewsRepository } from '../../src/data/news/repository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.slug) {
    return res.status(404).end()
  }

  const newsRepository = new NewsRepository()

  const content = await newsRepository.getNewsOnID(String(req.query.slug), {
    fields: 'id',
    draftKey: String(req.query.draftKey),
  })

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/blog/${content.id}` })
  res.end('Preview mode enabled')
}
