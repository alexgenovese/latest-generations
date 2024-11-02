import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ImageComp from "../../components/Image";
import type { ImageProps } from "../../utils/types";
import { getPhotoById } from '../../utils/supabaseSSR';

const Home: NextPage = ({ currentPhoto, photoId }: { currentPhoto: ImageProps[], photoId: string[] }) => {
  const router = useRouter();
  if (router.isFallback)  return <div>Loading...</div>;
  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_1024/${currentPhoto[0].public_id}.${currentPhoto[0].format}`

  return (
    <>
      <Head>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>

      <main className="mx-auto max-w-[1960px]">
        <Header />

        <ImageComp 
          currentPhoto={currentPhoto[0]}
          photoId={photoId}
        />


        <Footer />
      </main>
    </>
  );
};

export default Home;




export async function getStaticPaths() {
  return {
    paths: [{ params: { currentPhoto: [{
      id: 59,
      height: 'auto',
      width: 'auto',
      public_id: '32a95b4f-a382-473f-bc48-017126886e14',
      public_url: 'https://res.cloudinary.com/djy2oac4l/image/upload/32a95b4f-a382-473f-bc48-017126886e14',
      format: 'png',
      prompt: 'A portrait of a woman in a dynamic pose, captured in a side profile. She wears a long, flowing blue coat with a high collar and a belt cinched at the waist, paired with striped trousers. Her hair is styled in a sleek ponytail, and she wears black high heels. The woman stands on a paved walkway in front of a white building with large windows. The background shows a clear sky and a tree with yellow leaves, indicating a sunny day. The image style is contemporary, emphasizing fashion and urban aesthetics.',
      created_at: '2024-09-25T20:44:39.554935+00:00',
      blurDataUrl: 'data:image/jpeg;base64,'
    }], photoId: ["59"] }}],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPhoto = await getPhotoById(context.params.photoId)

  return {
    props: {
      currentPhoto: currentPhoto,
      photoId: [currentPhoto[0].id.toString()]
    },
  };
};


