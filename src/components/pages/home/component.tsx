import Image from 'next/image'
import * as React from 'react'
import { Props } from './types'

export const Home: React.VFC<Props> = () => {
  return (
    <div>
      <Image
        alt="Dragon"
        src="/dragon_no_string.png"
        layout="fill"
        objectFit="none"
        quality={100}
      />
    </div>
  )
}
