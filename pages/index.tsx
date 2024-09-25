import type { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import FirstBox from "../components/FirstBox";
import Modal from "../components/Modal";
// import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { createClient, getStaticResults } from '../utils/supabaseSSR';


const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const getNewPage = ( async () => {
    setIsLoading(true)
    setPage(page + 1)
    const data = await getStaticResults(10, (page*10), (page*10)+10 )
    
    let reducedResults: ImageProps[] = [];
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

    const blurImagePromises = data.map((image: ImageProps) => {
      // return getBase64ImageUrl(image);
      return image.public_url
    });
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
    
    for (let i = 0; i < reducedResults.length; i++) {
      reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
    }

    setPosts([...posts, ...reducedResults])
    setIsLoading(false)

  })

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
    if(page == 1) setPosts(images)

  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
          <meta property="og:image" content={`${process.env.url}/open-graph.png`} />
          <meta name="twitter:image" content={`${process.env.url}/open-graph.png`} />
      </Head>

      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={posts}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <FirstBox />
          { isLoading ? (
            <div className='z-50 absolute top-0 left-0 w-full h-full flex space-x-6 justify-center items-center bg-black/80'>
              <span className='text-4xl text-white font-semibold'>Loading...</span>
              <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
            </div>
          ) : '' }

          {posts.map(({ id, public_id, format, prompt, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={`Reica | ${prompt}`}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME : process.env.cloudinary_cloud_name }/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}

        </div>
        <div className="w-full border border-white/40 hover:border-white p-4 mx-auto text-center mt-12">
          <button className="bg-white p-6 block w-full text-3xl font-semibold" onClick={getNewPage}>Load More</button>
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Community creation from Reica {" "} – 
        <a
          href="https://getreica.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Try Reica for free
        </a>
      </footer>
    </>
  );
};


export const getStaticProps = (async (context) => {
  
  
  // SUPABASE
  const data = await getStaticResults(10, 0, 9)
  
  let reducedResults: ImageProps[] = [];
  let k = 0;
  for (let image of data){
    reducedResults.push({
      id: image.id, // id: k 
      height: "auto",
      width: "auto",
      public_id: image.image_name,
      public_url: image.public_url,
      format: image.image_format,
      prompt: image.prompt ? image.prompt : ""
    });

    k++;
  }
  
  const blurImagePromises = data.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
  
  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }
  
  return {
    props: {
      images: reducedResults,
    },
  };
} )

export default Home;