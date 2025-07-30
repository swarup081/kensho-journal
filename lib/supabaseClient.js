// lib/supabaseClient.js
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Create a new supabase client for the browser
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Export a singleton instance of the client
const supabase = createClient();

export { supabase };