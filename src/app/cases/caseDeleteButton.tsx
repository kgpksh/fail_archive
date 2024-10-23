"use client"

import { toast } from "@/components/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default async function CaseDeleteButton({ id }: { id: number }) {
    const {push, refresh} = useRouter()
    const onSubmit = async () => {
        const supabase = createClient()
        const {data, error} = await supabase
                                    .from('fail_cases')
                                    .delete()
                                    .eq('id', id)
        if(error) {
            toast({
                title: "Fail to delete",
                description: "Please try again"
            })
        } else {
            toast({
                title: "You case deleted"
            })
            push('/')
            refresh()
        }
        
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className="ml-2">
                <Button variant="outline">Delete</Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this case?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onSubmit}>
                    Delete
                </AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    )
}