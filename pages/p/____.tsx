import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { supabase } from '../../utils/supabaseClient';

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;
  // let index = Number(photoId);
  console.log("router", router.query)

  // const currentPhotoUrl = `https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <span className="text-white">main page</span>
      </main>
    </>
  );
};

export const getStaticProps = (async (context) => {
  console.log('------------------ CONTEXT', context.params)

  

  // SUPABASE
  // const { data, error } = await supabase
  // .from('latest_generations')
  // .select('*')
  // .eq("image_name", public_id);

  // // console.log("data", data)
  
  // if (error) {
  //   console.error('Error fetching data:', error);
  //   return { props: { data: [] } };
  // }

  return {
    props: {
      currentPhoto: {}
    },
  };

} );




export const getStaticPaths = (async () => {
  // SUPABASE
  const { data, error } = await supabase
  .from('latest_generations')
  .select('*', { count: 'exact' })

  // console.log('getStaticPath', data.length)

  let fullPaths = [];
  for (let i = 0; i < data.length; i++) {
    fullPaths.push({ params: { photoId: i.toString() } });
  }

  return {
    paths: fullPaths,
    fallback: false,
  };
})

export default Home;