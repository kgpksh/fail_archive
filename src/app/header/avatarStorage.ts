import { createClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AvatarStorage {
    avatarUrl: string | null
    setAvatarUrl: (userId : string) => void,
    revokeAvatarUrl: () => void
}

const avatarStorage = create<AvatarStorage>()(
    devtools(
        (set, get) => ({
            avatarUrl: null,
            setAvatarUrl: async (userId : string) => {
                const supabase = createClient()
                const avatarImg = await supabase
                    .storage
                    .from('avatars')
                    .download(`${userId}/0`)

                const blob = avatarImg.data
                if(blob) {
                    const url = URL.createObjectURL(avatarImg.data);
                    set({avatarUrl : url})
                } else {
                    get().revokeAvatarUrl()
                    
                }
            },
            revokeAvatarUrl: () => {
                const url = get().avatarUrl
                if(url) {
                    URL.revokeObjectURL(url)
                    set({avatarUrl : null})
                }
            }
        })
    ),
)

export default avatarStorage