import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Link from "next/link";

interface Props {
  posts: {contents: {id: string, title: string, contents: string}[]}
  
}

const Home: NextPage<Props> = ({posts}) => {
  return (
    <div className={styles.container}>
      {posts.contents.map(({ id, title }) => <li key={id}><Link href={`/blog/${id}`}><a>{title}</a></Link></li>)}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://dz-test.microcms.io/api/v1/news', {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}

export default Home
