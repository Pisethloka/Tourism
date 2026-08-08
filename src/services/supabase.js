/**
 * supabase.js - Supabase Client Initialization & Service Helper
 * Connects the web application to the Supabase cloud PostgreSQL database
 * for real-time global guestbook reviews and upvotes.
 */

import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables (with fallback to live project credentials)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://gofmheqssoznwbsizkzg.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_-vUixETDKXXvEs5Z0m969w_Jzz5bc4X";

// Check if credentials are properly configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "YOUR_SUPABASE_URL" &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY",
);

// Initialize Supabase client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
