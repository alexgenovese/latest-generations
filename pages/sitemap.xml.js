//pages/sitemap.xml.js
const BASE_URL = 'https://latest-generations.getreica.com';
import { getSitemapInfo } from '../utils/supabaseSSR';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://latest-generations.getreica.com</loc>
     </url>
     ${posts
       .map(({ id, created_at }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/p/${id}`}</loc>
           <lastmod>${`${created_at}`}</lastmod>
           <changefreq>yearly</changefreq>
           <priority>1</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const posts = await getSitemapInfo(0, 5);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;