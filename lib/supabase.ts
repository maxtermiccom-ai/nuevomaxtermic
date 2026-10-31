import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://vswmporuxdpfjfomlcjv.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzd21wb3J1eGRwZmpmb21sY2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNzU3ODgsImV4cCI6MjEwODk1MTc4OH0.kow0K91axtd-xIJx2Zl-roePKgnAaI3D63bQfBTjkZU
";

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function signInWithSupabase(email: string, password: string) {
  if (!supabase) {
    return { success: false, error: "Supabase no está configurado." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  return {
    success: !error,
    data,
    error,
  };
}

export const projectSelectColumns = "id, title, slug, category, description, client_name, images, created_at";

export async function getProjectsFromSupabase() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelectColumns)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading projects from Supabase:", error.message);
    return null;
  }

  return data ?? [];
}

export async function getSupabaseSession() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error obtaining session:", error.message);
    return null;
  }

  return data.session;
}
