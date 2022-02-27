import Link from 'next/link'
import * as React from 'react'
import { Props } from './types'

export const Home: React.VFC<Props> = (props) => {
  const { news, status } = props

  return (
    <div>
      {status}
      {news.items.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/blog/${id}`}>
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </div>
  )
}
