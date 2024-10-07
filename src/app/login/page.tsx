import { Button } from "@/components/ui/button";
import Image from "next/image";
import { googleSignIn } from "./actions";

export default function LoginForm() {
    return (
        <form className="flex flex-col items-center" action={googleSignIn}>
                    <Button type="submit" className="p-0 border-none bg-transparent">
                        <Image
                            className="cursor-pointer"
                            src={'/google_signup_2x.png'}
                            width={250}
                            height={50}
                            alt="Signup with Google"
                        />
                    </Button>
                           
        </form>
    )
}