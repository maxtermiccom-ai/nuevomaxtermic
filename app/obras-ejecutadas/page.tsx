import { CasosPageClient } from "@/components/casos-page-client";
import { SeoSchema } from "@/components/seo-schema";
import { SiteHeader } from "@/components/site-header";
import { getProjectsFromSupabase } from "@/lib/supabase";

export const metadata = {
  title: "Obras Ejecutadas | Proyectos de climatización y eficiencia energética",
  description:
    "Conoce proyectos de climatización industrial y soluciones térmicas ejecutados por MAXTERMIC para infraestructura crítica y operación continua.",
  alternates: {
    canonical: "/obras-ejecutadas",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Obras Ejecutadas de MAXTERMIC",
  description:
    "Portafolio de proyectos de climatización industrial, comercial e infraestructura crítica realizados por MAXTERMIC en Chile.",
  url: "https://www.maxtermic.com/obras-ejecutadas",
};

export default async function ObrasEjecutadasPage() {
  const projects = (await getProjectsFromSupabase()) ?? [];

  return (
    <>
      <SeoSchema data={collectionSchema} />
      <SiteHeader title="Obras Ejecutadas" ctaLabel="Cotizar proyecto" ctaHref="/contacto" />
      <CasosPageClient initialProjects={projects} />
    </>
  );
}
