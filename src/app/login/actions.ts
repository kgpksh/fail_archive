import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



const signOut = async () => {
  'use server'
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}

const googleSignIn = async () => {
  'use server';
  const origin = headers().get('origin');
  // 1. Create a Supabase client
  const supabase = createClient();
  // 2. Sign in with GitHub
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.log(error);
  } else {
    return redirect(data.url);
  }
  // 3. Redirect to landing page
};

export {signOut, googleSignIn}