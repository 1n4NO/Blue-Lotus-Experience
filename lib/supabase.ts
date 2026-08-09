import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // This only warns in the browser console / server logs. It does not throw,
  // so the rest of the site keeps working even before Supabase is configured.
  console.warn(
    'Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.local.example), then restart `npm run dev`.'
  );
}

// createClient throws immediately if the URL isn't a valid URL, so fall back
// to a harmless placeholder when unconfigured rather than crashing every page
// that imports this module. Actual submissions are blocked separately via
// isSupabaseConfigured (see application-modal.tsx).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
