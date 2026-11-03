import { LandingPage } from "@/components/landing-page";
import { SeoSchema } from "@/components/seo-schema";
import { getProjectsFromSupabase } from "@/lib/supabase";

export const metadata = {
  title: "MAXTERMIC | Climatización industrial y mantenimiento en Chile",
  description:
    "MAXTERMIC ofrece climatización industrial, comercial e infraestructura crítica con mantenimiento y eficiencia energética en Chile.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const supabaseProjects = await getProjectsFromSupabase();
  const projects = supabaseProjects ?? [];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MAXTERMIC",
    url: "https://www.maxtermic.com",
    description:
      "Empresa especializada en climatización industrial, comercial e infraestructura crítica en Chile.",
    areaServed: "CL",
    telephone: "+56 9 6674 0770",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Santiago Centro",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    sameAs: ["https://www.maxtermic.com"],
    knowsAbout: [
      "Climatización industrial",
      "Ventilación mecánica",
      "Chillers",
      "Mantenimiento HVAC",
      "Infraestructura crítica",
    ],
  };

  return (
    <>
      <SeoSchema data={organizationSchema} />
      <LandingPage projects={projects} />
    </>
  );
}
