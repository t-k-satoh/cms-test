import url from 'url'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      res.clearPreviewData()

      const queryObject = url.parse(req.url ?? '', true).query
      const redirectUrl =
        queryObject && queryObject.currentUrl ? queryObject.currentUrl : '/'

      res.writeHead(307, { Location: redirectUrl })
      res.end()

    default:
      res.writeHead(405)
      res.end()
  }
}
