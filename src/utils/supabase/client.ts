import { createBrowserClient } from '@supabase/ssr'



const createClient = () =>  {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const auth = createClient().auth

export {createClient, auth}