"use client";

import { useEffect, useState } from "react";
import { CasosPageClient } from "@/components/casos-page-client";
import { SiteHeader } from "@/components/site-header";
import { getProjectsFromSupabase } from "@/lib/supabase";
import type { ProjectRecord } from "@/lib/projects";

export function ObrasEjecutadasPageClient() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      const data = await getProjectsFromSupabase();
      if (isMounted) {
        setProjects(data ?? []);
        setIsReady(true);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return (
      <>
        <SiteHeader title="Obras Ejecutadas" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />
        <div className="bg-slate-950 text-slate-100">
          <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Cargando obras...</p>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader title="Obras Ejecutadas" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />
      <CasosPageClient initialProjects={projects} />
    </>
  );
}
