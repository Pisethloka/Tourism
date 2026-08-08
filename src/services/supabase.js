/**
 * supabase.js - Supabase Client Initialization & Service Helper (Next.js)
 * Connects the web application to the Supabase cloud PostgreSQL database
 * for real-time global guestbook reviews and upvotes.
 */

import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables (with fallback to live project credentials)
const supabaseUrl =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  "https://gofmheqssoznwbsizkzg.supabase.co";

const supabaseAnonKey =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
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
