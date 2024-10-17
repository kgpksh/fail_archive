"use client"

import { SubmitButton } from "@/components/ui/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { emailSignUpNewUser } from "../actions";
import { toast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";

export default async function RegisterForm() {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
            <form className="w-full p-8 [&>input]:mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <p className="text-sm text text-foreground my-3">
                    Already have an account?{" "}
                    <Link className="text-primary font-medium underline" href="/login">
                        Login
                    </Link>
                </p>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email
                </Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Type email here"
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <Label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
                    Password
                </Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type password here"
                    className="w-full p-3 border border-gray-300 rounded-md"
                />
                <SubmitButton pendingText="Registering..." formAction={async (formData) => {
                    const errorMessage = await emailSignUpNewUser(formData)
                    if (errorMessage) {
                        toast({
                            variant: "destructive",
                            title: "Error occured",
                            description: errorMessage
                        })
                        return
                    }
                    toast({
                        title: "Register success",
                        description: "Please check your email for a verification link."
                    })
                    router.push('/login')
                }}>
                    Register
                </SubmitButton>
            </form>
        </div>

    )
}