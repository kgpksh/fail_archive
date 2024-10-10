import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
interface Item {
    id: number,
    title: string,
    modified_at: string,
    created_at: string,
    tags: string[]
}
export default function CaseList({ data }: { data: Item[] }) {
    
    return (
        <div className="w-full ">
          {data?
          data.map((item : Item) => (
            <div
              key={item.id}
              className="flex items-center justify-between w-full h-20 p-3 mt-2 hover:bg-gray-200 cursor-pointer"
            >
              <div>
                <div className="text-lg font-bold">
                  {item.title}
                </div>
                <div>
                  {item.modified_at ? item.modified_at.slice(0, 10) : item.created_at.slice(0, 10)}
                </div>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild className={`${item.tags.length === 0 ? 'hidden' : ''} ml-6`}>
                  <Badge>Tags</Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-min">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} className="bg-blue-400 cursor-default hover:bg-blue-400">{tag}</Badge>
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