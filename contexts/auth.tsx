/* eslint-disable indent */
import { AuthChangeEvent, AuthError, Session } from '@supabase/supabase-js';
import { router, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext<{
  signInWithOtp: (email: string) => Promise<{ error: AuthError | null }>;
  verifyOtp: (
    email: string,
    token: string,
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  session: Session | null;
}>({
  signInWithOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
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
  const segments = useSegments();

  const signInWithOtp = async (email: string) => {
    return supabase.auth.signInWithOtp({ email }).then(({ error }) => {
      return { error };
    });
  };

  const verifyOtp = async (email: string, token: string) => {
    return supabase.auth
      .verifyOtp({ email, token, type: 'email' })
      .then(({ data, error }) => {
        setSession(data.session);
        return { error };
      });
  };

  const signOut = async () => {
    return supabase.auth.signOut().then(({ error }) => {
      setSession(null);
      return { error };
    });
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth event received: ', event);
        console.log('Session: ', session);
        setSession(session);
        if (session && segments.includes('(auth)' as never)) {
          router.replace('/(home)');
        } else if (!session && segments.includes('(home)' as never)) {
          router.replace('/(auth)');
        }
      },
    );
  }, []);

  useEffect(() => {
    if (!session && segments.includes('(home)' as never)) {
      router.replace('/(auth)');
    }
  }, [segments]);

  return (
    <AuthContext.Provider
      value={{
        signInWithOtp,
        verifyOtp,
        signOut,
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
