import { CaseListItem } from "@/app/cases/readingType";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

export default function CaseList({ data }: { data: CaseListItem[] }) {
  return (
    <div className="w-full ">
      {data ?
        data.map((item: CaseListItem) => (
          <Link
            href={`/cases/read/${item.id}`}
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
            <div className="flex flex-col">
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
              {item.nickname ? item.nickname : 'Someone'}
            </div>
            

          </Link>
        ))
        :
        ''}
    </div>
  );
}