"use client"

import { Badge } from "@/components/ui/badge";
import TagSearchComponent from "./tagSearchComponent";
import useTagStore from "./tagStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const tagMaxLength = 15
const maxTagNum = 10
export default function PageListController() {
    const { addedTags, removeTag } = useTagStore()
    const [inputValue, setInputValue] = useState<string>("");
    const route = useRouter()

    const searchAction = () => {
        const url = `/?search=${inputValue}&tags=${addedTags.join('+')}`
        route.push(url)
    };
    return (
        <div className="w-full h-56 flex">
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
            <div className="w-1/4 h-10 flex ml-5 items-start">
                <Input
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search word in title and description" />
                <Search onClick={searchAction} type="submit" className="cursor-pointer self-center ml-2" />
            </div>
        </div>
    )
}