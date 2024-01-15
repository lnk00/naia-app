/* eslint-disable indent */
import { AuthChangeEvent, AuthError, Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext<{
  signInWithOtp: (email: string) => Promise<{ error: AuthError | null }>;
  verifyOtp: (
    email: string,
    token: string,
  ) => Promise<{ error: AuthError | null; isUserNew: boolean }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  fetchSession: () => Promise<Session | null>;
  session: Session | null;
}>({
  signInWithOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null, isUserNew: false }),
  signOut: async () => ({ error: null }),
  fetchSession: async () => null,
  session: null,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const signInWithOtp = async (email: string) => {
    return supabase.auth.signInWithOtp({ email }).then(({ error }) => {
      return { error };
    });
  };

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    setSession(data.session);

    const { data: profileData } = await supabase
      .from('profiles')
      .select()
      .eq('id', data.session?.user.id)
      .single();

    return { error, isUserNew: !profileData.updated_at };
  };

  const signOut = async () => {
    return supabase.auth.signOut().then(({ error }) => {
      setSession(null);
      return { error };
    });
  };

  const fetchSession = async () => {
    return supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      return data.session;
    });
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth event received: ', event);
        console.log('Session: ', session);
        setSession(session);
      },
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithOtp,
        verifyOtp,
        signOut,
        fetchSession,
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
