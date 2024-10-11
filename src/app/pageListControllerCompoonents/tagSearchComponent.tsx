"use client"

import { Command, CommandInput, CommandList } from "../../components/ui/command"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import useTagStore from "./tagStore"

export default function TagSearchComponent({tagMaxLength, maxTagNum} : {tagMaxLength : number, maxTagNum : number}) {
    const [fetchedTags, setFetchedTags] = useState<string[]>([])
    const {addedTags, addTag} = useTagStore()
    const tagSearch = useDebouncedCallback(async (input) => {
        if (input?.length > 0) {
            try {
                const tagsRes = await fetch(`/searchTags/?word=${input}`);
                const calledTagsList = await tagsRes.json();
                setFetchedTags(calledTagsList)
            } catch (error) {
            }
        } else if (input === null || input?.length === 0) {
            setFetchedTags([])
        }
    }, 150)
    
    return (
        <Command className="w-1/3 h-full border-2">
            <CommandInput
                placeholder="Search tag"
                maxLength={tagMaxLength}
                onValueChange={tagSearch}
            />
            <CommandList>
                {fetchedTags.filter(duplicated => !addedTags.includes(duplicated)).map(tag => (
                    <div
                        className={`w-full text-center ${addedTags.length < maxTagNum ? 'cursor-pointer bg-blue-300' : 'bg-gray-50'} mb-2`}
                        onClick={() => {
                            if (addedTags.length < maxTagNum) {
                                addTag(tag)
                            }
                        }}
                    >
                        {tag}
                    </div>
                ))}
            </CommandList>
        </Command>
    )
}