import { LandingPage } from "@/components/landing-page";
import { getProjectsFromSupabase } from "@/lib/supabase";

export default async function Home() {
  const supabaseProjects = await getProjectsFromSupabase();
  const projects = supabaseProjects ?? [];

  return <LandingPage projects={projects} />;
}
