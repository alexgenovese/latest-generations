import { createBrowserClient } from '@supabase/ssr'
import type { ImageProps } from "../utils/types";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";

export function createClient() {
  return createBrowserClient(
    process.env.supabase['url'],
    process.env.supabase['api_key']
  )
}


/**
 * Get the images for the page 
 * @param num_items Number
 * @param range_start Number
 * @param range_end Number
 * @returns ImageProps 
 */
export async function getStaticResults(num_items, range_start, range_end) {
    try {
        const { data, error } = await createClient()
            .from('latest_generations')
            .select('*')
            .order('created_at', { ascending: false })
            .range(range_start, range_end)
            .limit(num_items);

        if(error) {
          console.error('Error fetching data:', error);
          return [];
        }

        return createImageList(data)
  
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

/**
 * Search the photo by Id
 * @param photoId : String
 * @returns ImageProps
 */
export const getPhotoById = async (photoId) => {
  try {
    const { data, error } = await createClient()
      .from('latest_generations')
      .select('*')
      .eq('id', photoId);
    
    if (error) {
      console.error('Error fetching data:', error);
      return { props: { data: [] } };
    }

    return createImageList(data)
    
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}


  
/**
 * Search autocomplete in header
 * @param search_to_search 
 * @returns array of json object
 */
export const searchResults = async (search_to_search, limit) => {
  const limit_results = (limit) ? limit : 20
    try {
      const { data, error } = await createClient()
        .from('latest_generations')
        .select()
        .textSearch('prompt', search_to_search)
        .limit(limit_results); 

      return createImageList(data)

    } catch (error) {
      if (error) {
        console.error('Error fetching search results data:', error);
        return { props: { data: [] } };
      }
    }
}

/**
 * Create the object for the frontend
 * @param data Supabase Object JSON
 * @returns ImageProps
 */
export const createImageList = async (data) => {
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
      prompt: image.prompt ? image.prompt : "",
      created_at: image.created_at ? image.created_at : ""
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

  return reducedResults
}



/**
 * Get data to generate the sitemap
 * @returns Supabase JSON
 */
export async function getSitemapInfo() {
  try {
      
      const { data, error } = await createClient()
          .from('latest_generations')
          .select('id, created_at')
          .limit(50000);

      if(error) {
        console.error('getSitemapInfo | Error fetching data:', error);
        return [];
      }

      return data

  } catch (error) {
      console.error('getSitemapInfo | Error fetching data:', error);
      return [];
  }
}