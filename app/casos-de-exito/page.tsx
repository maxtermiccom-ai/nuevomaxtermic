import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { mockProjects, type ProjectRecord } from "@/lib/projects";
import { getProjectsFromSupabase } from "@/lib/supabase";

export default async function CasosPage() {
  const supabaseProjects = await getProjectsFromSupabase();
  const projects: ProjectRecord[] = supabaseProjects && supabaseProjects.length > 0 ? supabaseProjects : mockProjects;

  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Casos de éxito" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Portafolio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Proyectos que entregan eficiencia, continuidad y confianza.
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
              <div className="h-52 overflow-hidden border-b border-slate-800">
                <img
                  src={project.images?.[0] ?? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">{project.category}</div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{project.client_name ?? "Cliente corporativo"}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
                <div className="mt-6 flex items-center gap-3">
                  <a href={`/casos-de-exito/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                    Ver detalle <ArrowRight size={15} />
                  </a>
                  <a href="/contacto" className="text-sm font-medium text-slate-300 transition hover:text-white">
                    Consultar caso
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
