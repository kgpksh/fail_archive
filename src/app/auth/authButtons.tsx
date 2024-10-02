"use client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js";
import SignIn from "./signIn"
import SignOut from "./signOut"
import { auth } from "@/utils/supabase/client"

const AuthButtons = () => {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setUser(session?.user || null);
      }
      setLoading(false); // 인증 상태가 확인되면 로딩 완료
    });

    // 현재 유저 정보를 체크하여 초기 상태 설정
    const getUser = async () => {
      const { data } = await auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    getUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return null; // 로딩 중일 때 표시할 UI
  }

    return (
        <>
            {user ? <SignOut /> : <SignIn />}
        </>
    )
}

export default AuthButtons
