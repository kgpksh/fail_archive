import List from "@/components/list";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
  const NUM_OF_ITEM_PER_PAGE = 10
  const pageNum : number = parseInt(searchParams.page) || 1
  const tags : string[] = searchParams.tags?.split(' ') || []
  const search : string = searchParams.search || ''
  const supabase = createClient()
  let query = supabase
  .from('fail_cases')
  .select(`
    id,
    title,
    created_at,
    modified_at,
    tags
  `)
  .range((pageNum - 1) * NUM_OF_ITEM_PER_PAGE, pageNum * NUM_OF_ITEM_PER_PAGE - 1);

  if (tags.length > 0) {
    query = query
      .contains('tags', tags);
  }

  if (search) {
    query = query
      .or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }
  const {data, error} = await query
  
  return (
    <List data={data ? data : []}></List>
  )
}
