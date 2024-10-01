"use client"
import { useState } from "react"
import { User } from "@supabase/supabase-js";
import SignIn from "./signIn"
import SignOut from "./signOut"
import { auth } from "@/utils/supabase/client"

const AuthButtons = () => {
    const [user, setUser] = useState<User | null>(null)
    auth.onAuthStateChange(async (event, session) => {
        if(event === "SIGNED_IN" || event === "SIGNED_OUT") {
            setUser(session?.user || null)
        }
        
    })

    return (
        <>
            {user ? <SignOut /> : <SignIn />}
        </>
    )
}

export default AuthButtons