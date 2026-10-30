import { LandingPage } from "@/components/landing-page";
import { mockProjects } from "@/lib/projects";
import { getProjectsFromSupabase } from "@/lib/supabase";

export default async function Home() {
  const supabaseProjects = await getProjectsFromSupabase();
  const projects = supabaseProjects && supabaseProjects.length > 0 ? supabaseProjects : mockProjects;

  return <LandingPage projects={projects} />;
}
