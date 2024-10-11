import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AddedTags {
    addedTags: string[]
    addTag: (tag: string) => void,
    removeTag : (tag: string) => void,
}

const useTagStore = create<AddedTags>()(
    devtools(
        (set, get) => ({
            addedTags: [],
            addTag : (tag) => {
                if(!get().addedTags.includes(tag)) {
                    set({addedTags : [...(get().addedTags), tag]})
                }
            },
            removeTag : (tag) => set({addedTags : [...(get().addedTags).filter(element => element !== tag)]}),
        })
    ),
)

export default useTagStore