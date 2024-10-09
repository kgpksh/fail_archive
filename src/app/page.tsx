import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const NUM_OF_ITEM_PER_PAGE = 10
  const supabase = createClient()
  const {data, error} = await supabase
                                .from('fail_cases')
                                .select(`
                                          id,
                                          title,
                                          started_date,
                                          tags(tag)
                                        `)
                                .limit(NUM_OF_ITEM_PER_PAGE)
  return (
        <div className="w-7/12 flex flex-col items-center">
          {data?
          data.map((item ) => (
            <div
              key={item.id}
              className="flex items-center w-full h-20 p-3 mt-2 hover:bg-gray-200 cursor-pointer"
            >
              <div className="flex-9">
                <div className="text-lg font-bold">
                  {item.title}
                </div>
                <div>
                  {item.started_date.slice(0, 10)}
                </div>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild className={`${item.tags.length === 0 ? 'hidden' : ''} ml-6`}>
                  <Badge>Tags</Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-min">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} className="bg-blue-400 cursor-default hover:bg-blue-400">{tag.tag}</Badge>
                  ))}
                </HoverCardContent>
              </HoverCard>
              
            </div>
          ))
          : 
          ''}
        </div>
  );
}
