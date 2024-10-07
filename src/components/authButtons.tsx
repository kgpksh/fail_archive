import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signOut } from "@/app/login/actions"

export default async function AuthButtons() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return user ? (
    <form action={signOut}>
      <Button>Sign out</Button>
    </form>
  ) : (
      <Button>
        <Link href={'/login'}>Sign In</Link>
      </Button>
    )
}
