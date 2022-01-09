import { createClient } from 'microcms-js-sdk'

export const clientSideClient = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN ?? '',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '',
})
