import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { mockProjects, type ProjectRecord } from "@/lib/projects";
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

async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const supabaseProjects = await getProjectsFromSupabase();
  const projectList = supabaseProjects && supabaseProjects.length > 0 ? supabaseProjects : mockProjects;
  return projectList.find((project) => project.slug === slug) ?? null;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const parsedDescription = parseProjectDescription(project.description);
  const projectDetails = project.details || parsedDescription.details;
  const resultKey = project.result_key || parsedDescription.resultKey || "+32% rendimiento";
  const detailItems = projectDetails
    ? projectDetails
        .split(/\n|•/)
        .map((item: string) => item.trim())
        .filter(Boolean)
        .slice(0, 4)
    : [
        "Diagnóstico técnico del sistema y requerimientos operativos.",
        "Diseño y dimensionamiento para condiciones reales de uso.",
        "Implementación con supervisión, ajustes y validación funcional.",
        "Soporte posterior para operación continua y mantenimiento predictivo.",
      ];

  const summaryText = project.description ? parsedDescription.summary : "Proyecto ejecutado por MAXTERMIC.";

  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Casos de éxito" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <Link href="/casos-de-exito" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
          <ArrowLeft size={15} /> Volver a casos
        </Link>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/70 shadow-[0_24px_60px_rgba(2,6,23,0.5)]">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="h-[340px] overflow-hidden bg-slate-900 lg:h-full">
              <img
                src={project.images?.[0] ?? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80">{project.category}</div>
              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{project.title}</h1>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate-400">{project.client_name ?? "Cliente corporativo"}</p>
              <p className="mt-6 text-base leading-7 text-slate-300">{summaryText}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.35)]">
                  Solicitar cotización <ArrowRight size={15} />
                </Link>
                <Link href="/casos-de-exito" className="inline-flex items-center rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/60 hover:text-white">
                  Ver otros casos
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { label: "Resultado clave", value: resultKey || "Eficiencia operativa", detail: "Optimización del desempeño del sistema" },
            { label: "Ámbito", value: project.category || "Infraestructura crítica", detail: "Diseño orientado a continuidad" },
            { label: "Impacto", value: "Ejecución institucional", detail: "Mejora de consumo y estabilidad" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">{item.label}</div>
              <div className="mt-4 text-2xl font-black text-white">{item.value}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-7">
            <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80">Resumen ejecutivo</div>
            <h2 className="mt-4 text-2xl font-black text-white">Solución adaptada a la operación real</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{summaryText}</p>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-7">
            <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/80">Entrega</div>
            <h2 className="mt-4 text-2xl font-black text-white">Trabajo con control, trazabilidad y respaldo</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {detailItems.map((item: string) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {project.images && project.images.length > 1 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.images.slice(1).map((image, index) => (
              <div key={`${project.id}-${index}`} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
                <img src={image} alt={`${project.title} vista ${index + 2}`} className="h-64 w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
