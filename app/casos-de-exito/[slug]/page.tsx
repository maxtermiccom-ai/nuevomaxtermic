import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectImageViewer } from "@/components/project-image-viewer";
import { SiteHeader } from "@/components/site-header";
import type { ProjectRecord } from "@/lib/projects";
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
  const projectList = supabaseProjects ?? [];
  return projectList.find((project: ProjectRecord) => project.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado | MAXTERMIC",
      description: "Proyecto no encontrado en el portafolio de MAXTERMIC.",
      alternates: { canonical: `/casos-de-exito/${slug}` },
    };
  }

  return {
    title: `${project.title} | Casos de éxito MAXTERMIC`,
    description: project.description ? parseProjectDescription(project.description).summary : `Caso de éxito de ${project.title} realizado por MAXTERMIC.`,
    alternates: { canonical: `/casos-de-exito/${project.slug}` },
  };
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

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/casos-de-exito" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
          <ArrowLeft size={15} /> Volver a casos
        </Link>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/70 shadow-[0_24px_60px_rgba(2,6,23,0.5)]">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="min-w-0 p-3 sm:p-4 lg:p-6">
              <ProjectImageViewer images={project.images ?? []} projectTitle={project.title} />
            </div>

            <div className="min-w-0 p-5 sm:p-7 lg:p-10">
              <div className="text-[9px] uppercase tracking-[0.22em] text-cyan-300/80 sm:text-[10px]">{project.category}</div>
              <h1 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white sm:text-4xl">{project.title}</h1>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-slate-400 sm:text-sm">{project.client_name ?? "Cliente corporativo"}</p>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base">{summaryText}</p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link href="/contacto" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.35)] sm:w-auto">
                  Solicitar cotización <ArrowRight size={15} />
                </Link>
                <Link href="/casos-de-exito" className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/60 hover:text-white sm:w-auto">
                  Ver otros casos
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
          {[
            { label: "Resultado clave", value: resultKey || "Eficiencia operativa", detail: "Optimización del desempeño del sistema" },
            { label: "Ámbito", value: project.category || "Infraestructura crítica", detail: "Diseño orientado a continuidad" },
            { label: "Impacto", value: "Ejecución institucional", detail: "Mejora de consumo y estabilidad" },
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <div className="text-[9px] uppercase tracking-[0.2em] text-cyan-300/80 sm:text-[10px]">{item.label}</div>
              <div className="mt-4 text-xl font-black text-white sm:text-2xl">{item.value}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2 lg:gap-6">
          <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
            <div className="text-[9px] uppercase tracking-[0.22em] text-cyan-300/80 sm:text-[10px]">Resumen ejecutivo</div>
            <h2 className="mt-4 text-xl font-black text-white sm:text-2xl">Solución adaptada a la operación real</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{summaryText}</p>
          </div>

          <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
            <div className="text-[9px] uppercase tracking-[0.22em] text-cyan-300/80 sm:text-[10px]">Entrega</div>
            <h2 className="mt-4 text-xl font-black text-white sm:text-2xl">Trabajo con control, trazabilidad y respaldo</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {detailItems.map((item: string) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

      </main>
    </div>
  );
}
