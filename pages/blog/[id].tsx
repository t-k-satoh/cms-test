const Blog = ({blog}: {blog: any}) => {
  return (
    <div >
      {JSON.stringify(blog)}
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch('https://dz-test.microcms.io/api/v1/news', {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const data = await res.json()

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`https://dz-test.microcms.io/api/v1/news/${id}`, {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const data = await res.json()

  return {
    props: {
      blog: data,
    },
  };
};

export default Blog