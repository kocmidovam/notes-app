import { createClient } from "@supabase/supabase-js";

// access the environment variables in vite application using import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if(!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or API Key in environment variables")
} 

export const supabase = createClient(supabaseUrl, supabaseKey)
