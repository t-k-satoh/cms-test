import {GetStaticProps, GetStaticPaths } from 'next'

const Blog = ({ blog }: { blog: any }) => {
  return (
    <div >
      {JSON.stringify(blog)}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://dz-test.microcms.io/api/v1/news', {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const data = await res.json()

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


export const getStaticProps: GetStaticProps<{blog: any}, {id: string, slug: string}, {draftKey: string}> = async (context) => {


  if (context.preview && typeof context.params !== 'undefined' && typeof context.previewData !== 'undefined') {
    const id = context.params.id
    const draftKey = context.previewData.draftKey;

    const content = await fetch(
      `https://dz-test.microcms.io/api/v1/news/${id}${
       draftKey !== undefined ? `?draftKey=${draftKey}` : ''
      }`,
      { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '' } }
     ).then((res) => res.json());


    return {
      props: {
        blog: content,
        fallback: false
      },
      
    };
  }

  const id = context.params?.id;
  const res = await fetch(`https://dz-test.microcms.io/api/v1/news/${id}`, {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const data = await res.json()

  return {
    props: {
      blog: data,
    },
  };
};

export default Blog
