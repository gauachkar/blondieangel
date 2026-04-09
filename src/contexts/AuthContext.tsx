// AUTH SPECIALIST AGENT — Supabase auth context
// All methods wrapped in try/catch — network errors surface as readable messages
// "Failed to fetch" → shown as a clear "Can't reach Supabase" message with fix guidance

import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

// Converts raw errors (including network failures) into user-readable strings
function parseError(err: unknown): string {
  if (err instanceof Error) {
    if (err.message.toLowerCase().includes("failed to fetch") ||
        err.message.toLowerCase().includes("networkerror") ||
        err.message.toLowerCase().includes("fetch")) {
      return "Can't reach Supabase. Check that VITE_SUPABASE_URL is your real project URL (found in Supabase → Settings → API).";
    }
    return err.message;
  }
  return "Something went wrong. Please try again.";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate session on mount — catch network errors silently so page still loads
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
      })
      .catch(() => {/* project URL wrong — auth just won't work, rest of site is fine */})
      .finally(() => setLoading(false));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? parseError(error) : null };
    } catch (err) {
      return { error: parseError(err) };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error: error ? parseError(error) : null };
    } catch (err) {
      return { error: parseError(err) };
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/portal` },
      });
      return { error: error ? parseError(error) : null };
    } catch (err) {
      return { error: parseError(err) };
    }
  };

  const signOut = async () => {
    try { await supabase.auth.signOut(); } catch { /* ignore */ }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signInWithMagicLink, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  return ctx;
}
