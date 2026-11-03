import { CasosPageClient } from "@/components/casos-page-client";
import { SeoSchema } from "@/components/seo-schema";
import { SiteHeader } from "@/components/site-header";
import { getProjectsFromSupabase } from "@/lib/supabase";

export const metadata = {
  title: "Casos de éxito | Proyectos de climatización y eficiencia energética",
  description:
    "Conoce proyectos de climatización industrial y soluciones térmicas ejecutados por MAXTERMIC para infraestructura crítica y operación continua.",
  alternates: {
    canonical: "/casos-de-exito",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Casos de éxito de MAXTERMIC",
  description:
    "Portafolio de proyectos de climatización industrial, comercial e infraestructura crítica realizados por MAXTERMIC en Chile.",
  url: "https://www.maxtermic.com/casos-de-exito",
};

export default async function CasosPage() {
  const projects = (await getProjectsFromSupabase()) ?? [];

  return (
    <>
      <SeoSchema data={collectionSchema} />
      <SiteHeader title="Casos de éxito" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />
      <CasosPageClient initialProjects={projects} />
    </>
  );
}
