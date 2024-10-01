"use client"

import { Button } from "@/components/ui/button"
import { auth } from "@/utils/supabase/client"

const SignOut = () => {
    return(
        <Button
        onClick={async () => {
            await auth.signOut()
        }}
        >
            Sign out
        </Button>
    )
}

export default SignOut