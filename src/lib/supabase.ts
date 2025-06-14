import { createClient } from '@supabase/supabase-js';

// Mock Supabase configuration - replace with actual values
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock auth functions for development
export const mockAuth = {
  signUp: async (email: string, password: string) => {
    // Mock sign up
    return { data: { user: { id: '1', email } }, error: null };
  },
  signIn: async (email: string, password: string) => {
    // Mock sign in
    return { data: { user: { id: '1', email } }, error: null };
  },
  signOut: async () => {
    // Mock sign out
    return { error: null };
  },
  getUser: async () => {
    // Mock get user
    return { data: { user: null }, error: null };
  }
};