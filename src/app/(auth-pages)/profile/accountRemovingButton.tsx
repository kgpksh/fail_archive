"use client"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SubmitButton } from "@/components/ui/submitButton"
import { deactiveAccount } from "../actions"
import { useRouter } from "next/navigation"

export default function AccountRemovingButton({ userId }: { userId: string }) {
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild className="flex">
                <Button className="bg-red-600 hover:bg-black mt-8">
                    Deactive Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                Will you really deactive account?
                </DialogTitle>
                <DialogDescription>
                Your account will be deactive. If you don't want the cases you've created to remain, you should delete them before leaving your account.
                </DialogDescription>
                <form>
                    <SubmitButton className="bg-red-600 hover:bg-black" pendingText="Deactiving account..."
                    formAction={async () => {
                        const errorMessage = await deactiveAccount(userId)
                        if (errorMessage) {
                            toast({
                                variant: "destructive",
                                title: "Error occured",
                                description: 'Please try again.'
                            })
                            return
                        }
                        toast({
                            title: "Account deactivated."
                        })
                        router.push('/')}
                    }
                    >
                        Deactive Account
                    </SubmitButton>
                </form>

            </DialogContent>
        </Dialog>

    )
}