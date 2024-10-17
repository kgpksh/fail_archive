import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signOut } from "@/app/(auth-pages)/actions"

export default async function AuthButtons() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <form action={signOut} className="ml-auto">
      <Button>Log out</Button>
    </form>
  ) : (
      <Button className="ml-auto">
        <Link href={'/login'}>Log In</Link>
      </Button>
    )
}
