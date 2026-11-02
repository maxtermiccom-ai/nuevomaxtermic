"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProjectImageViewer } from "@/components/project-image-viewer";
import { SiteHeader } from "@/components/site-header";
import { mockProjects, projectCategories, type ProjectRecord } from "@/lib/projects";
import { getProjectsFromSupabase } from "@/lib/supabase";

const projectDescriptionDelimiter = "___MAXTERMIC_DETAILS___";
const projectResultDelimiter = "___MAXTERMIC_RESULT___";

function parseProjectDescription(rawDescription?: string) {
  const summaryFallback = "Proyecto ejecutado por MAXTERMIC.";
  if (!rawDescription) {
    return { summary: summaryFallback, details: "", resultKey: "" };
  }

  const [summaryPart, ...rest] = rawDescription.split(projectDescriptionDelimiter);
  const withoutSummary = rest.join(projectDescriptionDelimiter);
  const [detailsPart, maybeResult] = withoutSummary.split(projectResultDelimiter);

  return {
    summary: summaryPart.trim() || summaryFallback,
    details: detailsPart.trim(),
    resultKey: maybeResult?.trim() || "",
  };
}

export default function CasosPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("Todos");
  const [projects, setProjects] = useState<ProjectRecord[]>(mockProjects);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      const supabaseProjects = await getProjectsFromSupabase();
      if (!active) {
        return;
      }

      if (supabaseProjects && supabaseProjects.length > 0) {
        setProjects(supabaseProjects);
      }
    };

    void loadProjects();

    return () => {
      active = false;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Casos de éxito" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Portafolio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Proyectos que entregan eficiencia, continuidad y confianza.
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                activeCategory === category
                  ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const parsedDescription = parseProjectDescription(project.description);
            const summaryText = project.description ? parsedDescription.summary : "Proyecto ejecutado por MAXTERMIC.";
            const highlightedResult = project.result_key || parsedDescription.resultKey || "Eficiencia operativa";

            return (
              <article key={project.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
                <div className="border-b border-slate-800 bg-slate-950/40 p-3">
                  <ProjectImageViewer images={project.images ?? []} projectTitle={project.title} compact />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">{project.category}</div>
                    {highlightedResult && (
                      <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                        {highlightedResult}
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{project.client_name ?? "Cliente corporativo"}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{summaryText}</p>
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
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">
            No hay proyectos para la categoría seleccionada.
          </div>
        )}
      </main>
    </div>
  );
}
