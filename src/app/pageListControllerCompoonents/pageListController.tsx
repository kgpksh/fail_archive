"use client"

import { Badge } from "@/components/ui/badge";
import TagSearchComponent from "./tagSearchComponent";
import useTagStore from "./tagStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { PencilIcon, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const tagMaxLength = 15
const maxTagNum = 10
export default function PageListController({ noResult }: { noResult: boolean }) {
    const { addedTags, removeTag } = useTagStore()
    const [inputValue, setInputValue] = useState<string>("");
    const route = useRouter()
    const pageNum: number = parseInt(useSearchParams().get('page') || '1')
    const url = `/?search=${inputValue}&tags=${addedTags.join('+')}`

    const searchAction = () => {
        route.push(url)
    };
    const movePage = (direction: number) => {
        const nextPage = pageNum + direction < 1 ? '' : `&page=${pageNum + direction}`
        route.push(url + nextPage)
    }
    return (
        <div className="w-full h-56 flex">
            <Button onClick={() => movePage(-1)} disabled={pageNum < 2} className="mr-2">
                Prev
            </Button>
            <TagSearchComponent tagMaxLength={tagMaxLength} maxTagNum={maxTagNum} />
            <ScrollArea className="w-1/4 h-full border-2 rounded-xl ml-5">
                <div className="flex justify-between p-2">
                    <div className="font-bold">Tags</div>
                    <div>{addedTags.length} / {maxTagNum}</div>
                </div>

                {addedTags.map((tag) => (
                    <Badge className="ml-2 my-2 bg-blue-400 cursor-pointer" onClick={() => removeTag(tag)}>{tag} x</Badge>
                ))}
            </ScrollArea>
            <div className="w-1/4 flex flex-col ml-5 items-start">
                <div className="w-full h-10 flex items-start">
                    <Input
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search word in title and description" />
                    <Search onClick={searchAction} type="submit" className="cursor-pointer self-center ml-2" />
                    
                </div>
                <Link href={'/cases/write'}><Button className="mt-5"><PencilIcon />Add case</Button></Link>
                
            </div>

            <Button onClick={() => movePage(1)} disabled={noResult} className="ml-2">
                Next
            </Button>
        </div>
    )
}