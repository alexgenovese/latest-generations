import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { supabase } from '../../utils/supabaseClient';

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  let reducedResults: ImageProps[] = [];

  // SUPABASE
  const { data, error } = await supabase
  .from('latest_generations')
  .select('*')
  .eq('id', context.params.photoId);
  
  if (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } };
  }

  // Building ImageProps type just for one image
  let k = 0;
  for (let image of data){
    reducedResults.push({
      id: image.id,
      height: "auto",
      width: "auto",
      public_id: image.image_name,
      public_url: image.public_url,
      format: image.image_format,
      prompt: image.prompt ? image.prompt : ""
    });
    k++;
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params.photoId),
  );
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
};

export async function getStaticPaths() {
  // SUPABASE
  const { data, error } = await supabase
  .from('latest_generations')
  .select('id');

  let fullPaths = [];
  for (let i = 0; i < data.length; i++) {
    fullPaths.push({ params: { photoId: data[i].id.toString() } });
  }

  console.log('fullPaths', fullPaths)

  return {
    paths: fullPaths,
    fallback: false,
  };
}
