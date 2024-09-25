import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.supabase.url,
    process.env.supabase.api_key
  )
}

export async function getStaticResults(num_items, range_start, range_end) {
    try {
        const { data, error } = await createClient()
            .from('latest_generations')
            .select('*')
            .order('created_at', { ascending: true })
            .range(range_start, range_end)
            .limit(num_items); 
  
        return data
  
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
  }
  