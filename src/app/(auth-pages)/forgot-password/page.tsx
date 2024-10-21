"use client"

import { SubmitButton } from "@/components/ui/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/hooks/use-toast";
import Link from "next/link";
import { forgotPasswordAction } from "../actions";

export default async function ForgotPassword() {
    return (
        <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
            <form className="w-full p-8 [&>input]:mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Reset password</h2>
                <p className="text-sm text-secondary-foreground">
                    Already have an account?{" "}
                    <Link className="text-primary underline" href="/login">
                        Login
                    </Link>
                </p>
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                <SubmitButton pendingText="Resetting password..." formAction={async (formData) => {
                    const errorMessage = await forgotPasswordAction(formData)
                    if (errorMessage) {
                        toast({
                            variant: "destructive",
                            title: "Error occured",
                            description: errorMessage
                        })
                        return
                    }
                    toast({
                        title: "Check your email for a link to reset your password.",
                    })
                }}>
                    Reset password
                </SubmitButton>
            </form>
        </div>

    )
}