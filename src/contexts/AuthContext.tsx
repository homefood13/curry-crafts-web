
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isSupabaseConfigured: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Authentication features will be limited.');
        setLoading(false);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isSupabaseConfigured) {
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      setData();

      return () => {
        listener?.subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    session,
    user,
    loading,
    isSupabaseConfigured,
    signIn: async (email: string, password: string) => {
      if (!isSupabaseConfigured) {
        toast({
          title: "Supabase not configured",
          description: "Please set your Supabase credentials in the environment variables.",
          variant: "destructive",
        });
        throw new Error('Supabase not configured. Please set environment variables.');
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
    },
    signUp: async (email: string, password: string) => {
      if (!isSupabaseConfigured) {
        toast({
          title: "Supabase not configured",
          description: "Please set your Supabase credentials in the environment variables.",
          variant: "destructive",
        });
        throw new Error('Supabase not configured. Please set environment variables.');
      }
      
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign up successful",
        description: "Please check your email to confirm your account.",
      });
    },
    signOut: async () => {
      if (!isSupabaseConfigured) {
        toast({
          title: "Supabase not configured",
          description: "Please set your Supabase credentials in the environment variables.",
          variant: "destructive",
        });
        throw new Error('Supabase not configured. Please set environment variables.');
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign out successful",
        description: "You have been signed out successfully.",
      });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
