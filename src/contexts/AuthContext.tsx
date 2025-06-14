import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { mockAuth } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      const { data } = await mockAuth.getUser();
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          favorite_drivers: [],
          favorite_teams: [],
          created_at: new Date().toISOString()
        });
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await mockAuth.signIn(email, password);
    if (error) throw error;
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email,
        favorite_drivers: [],
        favorite_teams: [],
        created_at: new Date().toISOString()
      });
    }
  };

  const signUp = async (email: string, password: string, userData?: Partial<User>) => {
    const { data, error } = await mockAuth.signUp(email, password);
    if (error) throw error;
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email,
        favorite_drivers: userData?.favorite_drivers || [],
        favorite_teams: userData?.favorite_teams || [],
        created_at: new Date().toISOString()
      });
    }
  };

  const signOut = async () => {
    await mockAuth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};