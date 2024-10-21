"use client"
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link"
import { useEffect } from "react";
import avatarStorage from "./avatarStorage";

export default function UserAvatar({ userId }: { userId: string }) {
    const {avatarUrl, setAvatarUrl} = avatarStorage()

    useEffect(() => {
        setAvatarUrl(userId)
    }, [])
    return (
        <>
            <Link href={'/profile'}>
                <Avatar>
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback asChild><CircleUser /></AvatarFallback>
                </Avatar>
            </Link>
        </>
    )
}