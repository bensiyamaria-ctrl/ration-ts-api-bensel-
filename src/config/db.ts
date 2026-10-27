
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase URL or publishable key in .env"
  );
}

export const db = createClient<Database>(
  supabaseUrl, 
  supabaseKey
);
