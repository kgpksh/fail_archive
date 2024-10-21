"use client"

import Image from "next/image";
import { googleSignIn, signInWithEmail } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submitButton";
import Link from "next/link";
import { toast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";

export default async function LoginForm() {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
            <form className="w-full p-8 [&>input]:mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <p className="text-sm text-foreground my-3">
                    Don't have an email account?{" "}
                    <Link className="text-foreground font-medium underline" href="/register">
                        Register
                    </Link>
                </p>

                <Label htmlFor="email" className="blocktext-sm font-medium text-gray-600">
                    Email
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type email here"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
                <Label htmlFor="password" className="blocktext-sm font-medium text-gray-600">
                    Password
                </Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type password here"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
                <Link
                    className="text-xs text-foreground underline mb-2"
                    href="/forgot-password"
                >
                    Forgot Password?
                </Link>
                <SubmitButton pendingText="Now log in..." formAction={async (formData) => {
                    const errorMessage = await signInWithEmail(formData)
                    if (errorMessage) {
                        toast({
                            variant: "destructive",
                            title: "Error occured",
                            description: errorMessage
                        })
                        return
                    }
                    router.push('/')
                }}>
                    Login
                </SubmitButton>
            </form>
            <form className="flex flex-col w-full max-w-md items-center" action={googleSignIn}>
                <button type="submit" className="block w-3/5 h-full">
                    <Image
                        className="cursor-pointer"
                        src={'/web_light_sq_SU.svg'}
                        layout="responsive"
                        width={200}
                        height={50}
                        alt="Signup with Google"
                    />
                </button>
            </form>
        </div>
    );
}