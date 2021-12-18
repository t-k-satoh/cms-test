import type { MicroCMSDate, MicroCMSContentId } from 'microcms-js-sdk'

export interface News extends MicroCMSContentId, MicroCMSDate {
  title: string
  tag?: string
  contents: string
}
