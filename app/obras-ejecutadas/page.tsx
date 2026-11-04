import { ObrasEjecutadasPageClient } from "@/components/obras-ejecutadas-page";
import { SeoSchema } from "@/components/seo-schema";

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

export default function ObrasEjecutadasPage() {
  return (
    <>
      <SeoSchema data={collectionSchema} />
      <ObrasEjecutadasPageClient />
    </>
  );
}
