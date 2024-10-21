"use client"

import avatarStorage from "@/app/header/avatarStorage"
import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import AccountRemovingButton from "./accountRemovingButton"
import { SubmitButton } from "@/components/ui/submitButton"
import Link from "next/link"

let isDelete = false

export default function Profile({ userId }: { userId: string }) {
    const [nickname, setNickname] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>('');
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { avatarUrl, setAvatarUrl, revokeAvatarUrl } = avatarStorage()

    const SUPA_AVATAR_STORAGE_NAME = 'avatars'
    const USER_PROFILES = 'user_profiles'

    const createImageUrlFromBlob = (blob: Blob) => {
        if (blob) {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }

            const url = URL.createObjectURL(blob);
            isDelete = false
            setImageUrl(url);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 사용자가 선택한 파일
        if (file) {
            createImageUrlFromBlob(file);
            setSelectedFile(file);
        } else {
            isDelete = true
        }
    };

    const fetchAndSetUser = useCallback(async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from(USER_PROFILES)
            .select('nickname')
            .eq('id', userId)
            .single()


        // const avatarImg = await supabase
        //     .storage
        //     .from(SUPA_AVATAR_STORAGE_NAME)
        //     .download(`${userId}/0`)

        setNickname(data?.nickname);
        setImageUrl(avatarUrl)
        // const file = avatarImg.data
        // if (file) {
        //     createImageUrlFromBlob(file);
        // }
    }, [userId]);

    useEffect(() => {
        fetchAndSetUser();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl)
            }
        }
    }, [fetchAndSetUser])

    const saveProfile = async () => {
        const supabase = createClient()
        const profileUpdate = await supabase.from('user_profiles')
            .update({ nickname: nickname })
            .eq('id', userId)

        const caesUpdate = await supabase.from('fail_cases')
            .update({ nickname: nickname })
            .eq('user_id', userId)


        let imgUploadResult = null
        if (isDelete) {
            imgUploadResult = await supabase
                .storage
                .from(SUPA_AVATAR_STORAGE_NAME)
                .remove([`${userId}/0`])
        } else {
            imgUploadResult = await supabase
                .storage
                .from(SUPA_AVATAR_STORAGE_NAME)
                .upload(`${userId}/0?updated=${Date.now()}`, selectedFile!, {
                    upsert: true
                })
        }

        if (profileUpdate.error || caesUpdate.error || imgUploadResult.error) {
            toast({
                variant: "destructive",
                title: "Error occured",
                description: "Please try again."
            })
            return
        }

        setAvatarUrl(userId)
        toast({
            title: "New profile saved.",
            description: "Image changing could require some time..."
        })
    }

    const handleRemoveImage = () => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl)
        }

        setImageUrl(null)

        if (selectedFile) {
            setSelectedFile(null)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        isDelete = true
    }

    return (
        <div>
            <div className="mt-8">Nickname</div>
            <Input
                id="nickname"
                defaultValue={nickname ? nickname : ''}
                onChange={(ref) => setNickname(ref.target.value)}
            />
            <div className="mt-8 w-20">
                <div>Image</div>
                <Label htmlFor="profileImage" className="w-20 h-20 cursor-pointer">
                    {imageUrl ?
                        <div className="relative w-20 h-20">
                            <Image src={imageUrl} alt="No profile image" width={80} height={80} />
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation();
                                    handleRemoveImage();
                                }}
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                            >
                                X
                            </button>
                        </div>
                        :
                        <div className="flex justify-center items-center w-20 h-20 bg-gray-300">
                            No image
                        </div>}
                </Label>
                <Input
                    id="profileImage"
                    type="file"
                    onChange={handleFileChange}
                    className="invisible"
                    ref={fileInputRef}
                />
            </div>
            <Button onClick={saveProfile} className="self-end">Save</Button>
            <Link href={'/reset-password'} className="flex mt-8">
                <Button>Reset password</Button>
            </Link>
            <AccountRemovingButton userId={userId}></AccountRemovingButton>
        </div>
    )
}