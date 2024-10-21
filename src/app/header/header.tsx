import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { signOut } from "../(auth-pages)/actions";
import UserAvatar from "./avatar";

export default async function Header() {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    return (
        <nav className="flex w-full p-8 justify-between items-center">
            <Link href="/" className="text-lg font-bold ml-8">
                Home
            </Link>
            {
                user ?
                    <div className="flex items-center space-x-4">
                        <div>{user.email}</div>
                        <UserAvatar userId={user.id}/>


                        {/* <CircleUser width={40} height={40} /> */}
                        <form action={signOut}>

                            <Button>Log out</Button>
                        </form>
                    </div>

                    :

                    <Button>
                        <Link href={'/login'}>Log In</Link>
                    </Button>
            }

        </nav>
    )
}