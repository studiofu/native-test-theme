import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../lib/supabase";

type AuthData = {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
})

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // use effect to fetch session
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    // set session and profile
    fetchSession();

    // listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('set session', session)
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session: session, profile: profile, loading: loading, isAdmin: false }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;