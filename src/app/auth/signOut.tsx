"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"

const SignOut = () => {
    return(
        <Button
        onClick={async () => {
            await createClient().auth.signOut()
        }}
        >
            Sign out
        </Button>
    )
}

export default SignOut