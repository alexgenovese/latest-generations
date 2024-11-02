import type { NextPage } from "next";
import type { ImageProps } from "../../utils/types";
import { useRouter } from 'next/router';
import { searchResults } from '../../utils/supabaseSSR';
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Result: NextPage = ({ query, postSlug }: { query: string[], postSlug: ImageProps[] }) => {
  const router = useRouter();
  if (router.isFallback || postSlug == undefined)  return <div>Loading...</div>;
  // Render post...


  return (
    <>
    <main className="mx-auto max-w-[1960px] p-4">
      <Header />

      <section className="relative py-14 lg:pt-12 lg:pb-2 lg:mb-4 bg-gray-100">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
              <div className="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-10">
              <h1 className="font-manrope font-bold text-4xl leading-snug sm:text-5xl text-center mb-5 text-black">
                  Results for {query[0]}
              </h1>
              </div>
          </div>
      </section>

      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">

        {postSlug.map(({ id, public_id, format, prompt, blurDataUrl }) => (
          <Link
            key={id}
            href={`/p/${id}`}
            as={`/p/${id}`}
            shallow
            className="after:content group relative mb-5 block w-full after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              alt={`Reica | ${prompt.substring(0, 97) + "..."}`}
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
    
    </main>
    <Footer />
    </>
  )
};

export default Result;


export async function getStaticPaths() {
  return {
    paths: [{ params: { postSlug: [], query: ["cat"] }}],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
    if (!params || params.postSlug == undefined) return { props: { query: ['58'], postSlug: [] } }
    const data = await searchResults(params.postSlug[0], 20)
  
    if (!data){
        console.error('Error fetching search results data:', data);
        return { props: { query: ['58'], postSlug: [] } };
    }
    
    return {
      props: {
        postSlug: data,
        query: [params.postSlug[0].toString() ]
      },
    };
}