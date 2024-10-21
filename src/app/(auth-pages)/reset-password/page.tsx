"use client"

import { SubmitButton } from "@/components/ui/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/hooks/use-toast";
import { resetPasswordAction } from "../actions";

export default async function ResetPassword() {
    return (
        <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto">
            <form className="w-full p-8 [&>input]:mb-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">Reset password</h2>
                <p className="text-sm text-foreground/60">
                    Please enter your new password below.
                </p>
                <Label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">
                    New password
                </Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="New password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
                <Label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-600">
                    Confirm password
                </Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
                <SubmitButton pendingText="Resetting password..." formAction={async (formData) => {
                    const errorMessage = await resetPasswordAction(formData)
                    if (errorMessage) {
                        toast({
                            variant: "destructive",
                            title: "Error occured",
                            description: errorMessage
                        })
                        return
                    }
                    toast({
                        title: "Password changed successfully",
                    })
                }}>
                    Reset password
                </SubmitButton>
            </form>
        </div>

    )
}