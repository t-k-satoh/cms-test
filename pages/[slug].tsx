const Slug = ({content}: {content: any}) => {
  return (
    <div >
      {JSON.stringify(content)}
    </div>
  )
}

export const getStaticPaths = async (context: any) => {
  const res = await fetch('https://dz-test.microcms.io/api/v1/news', {headers: {['X-MICROCMS-API-KEY']: process.env.MICROCMS_API_KEY?? ''}})
  const data = await res.json()



  const paths = data.contents.map((content: any) => `/${content.id}`);
  return { paths, fallback: false };
};



export const getStaticProps = async (context: any) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;

  const content = await fetch(
    `https://dz-test.microcms.io/api/v1/news/${slug}${
     draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY || '' } }
   ).then((res) => res.json());

  return {
    props: {
      content, fallback: false
    },
  };
};

export default Slug
