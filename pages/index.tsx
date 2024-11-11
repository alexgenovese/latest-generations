import type { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { getStaticResults } from '../utils/supabaseSSR';
import Loading from '../components/Loading';


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
    const itemsPerPage = 20
    const data = await getStaticResults(itemsPerPage, (page*itemsPerPage), (page*itemsPerPage)+itemsPerPage )
  
    setPosts([...posts, ...data])
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
        <Header />

        <section className="relative py-14 lg:pt-12 lg:pb-2 lg:mb-4 bg-gray-100">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
            <div className="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-10">
              <h1 className="font-manrope font-bold text-4xl leading-snug sm:text-5xl text-center mb-5 text-black">
                Free license collection of generated realistic images
              </h1>
              <p className="text-xl font-medium leading-8 text-gray-400 text-center mb-7 max-w-xl mx-auto">
                Download and use for your social media posts or adv
              </p>
            </div>
          </div>
        </section>

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          { isLoading ? ( <Loading /> ) : '' }

          {posts.map(({ id, public_id, format, prompt, blurDataUrl }) => (
            <Link
              key={id}
              href={`/p/${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={`Reica | ${prompt.substring(0, 97) + "..."}`}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_720/${public_id}.${format}`}
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

        { isLoading ? ( 
          <div className="w-full border border-white/40 hover:border-white p-4 mx-auto text-center mt-12">
            <button disabled className="bg-black p-6 block w-full text-3xl font-semibold text-white">Loading...</button>
          </div>

         ) : 
        <div className="w-full border border-white/40 hover:border-white p-4 mx-auto text-center mt-12">
          <button className="bg-black p-6 block w-full text-3xl font-semibold text-white" onClick={getNewPage}>Load More</button>
        </div>
         }
      </main>
      
      <Footer />
    </>
  );
};


export const getStaticProps = (async (context) => {
  // SUPABASE
  const data = await getStaticResults(20, 0, 29)

  if (!data){
      console.error('Error fetching search results data:', data);
      return { props: { images: [] } };
  }
  
  return {
    props: {
      images: data,
    },
  };
} )

export default Home;