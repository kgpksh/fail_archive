"use server"

import { createAdminClient } from "@/utils/supabase/admin_role_server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}

const emailSignUpNewUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient()
  const origin = headers().get("origin");
  if (!email || !password) {
    return "Email and password are required"
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  return error?.message
}

const signInWithEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  let errorMessage = error?.message

  if(errorMessage === "Invalid login credentials")  {
    errorMessage = "Invalid email or password"
  }

  return errorMessage
}

const googleSignIn = async () => {
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
  } else {
    return redirect(data.url);
  }
};

const deactiveAccount = async (userId : string) => {
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(userId,true)

  if (error) {
    return error.message
  }
};


export { signOut, googleSignIn, emailSignUpNewUser, signInWithEmail, deactiveAccount }