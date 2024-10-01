"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { auth } from "@/utils/supabase/client"

const SignIn = () => {
    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>
                <Button>Sign in</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center">
                    <Image
                        className="cursor-pointer"
                        src={'/google_signup_2x.png'}
                        width={250}
                        height={50}
                        alt="Signup with Google"
                        onClick={async () => {
                            const { data : dataUser, error } = await auth.signInWithOAuth({
                                provider: 'google',
                                options: {
                                    redirectTo: '/',
                                }
                            })
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignIn