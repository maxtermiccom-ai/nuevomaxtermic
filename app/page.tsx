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

  const serviceOfferings = [
    {
      name: "Climatización industrial y VRV/VRF",
      description:
        "Sistema de climatización para plantas, fábricas, bodegas y operaciones con alta exigencia técnica.",
    },
    {
      name: "Chiller y torres de enfriamiento",
      description:
        "Soluciones térmicas para edificios y proyectos de gran escala con continuidad operativa y eficiencia energética.",
    },
    {
      name: "Ventilación mecánica y extracción",
      description:
        "Diseño y ejecución de ventilación para confort, calidad de aire y evacuación en entornos críticos.",
    },
    {
      name: "Mantenimiento preventivo y correctivo",
      description:
        "Programas de atención técnica para prevenir fallas, optimizar consumo y prolongar la vida útil del sistema.",
    },
  ];

  const faqItems = [
    {
      question: "¿Qué tipo de proyectos atiende MAXTERMIC?",
      answer:
        "Atendemos proyectos industriales, comerciales e institucionales con foco en infraestructura crítica, eficiencia energética y continuidad operativa.",
    },
    {
      question: "¿Pueden evaluar sistemas existentes?",
      answer:
        "Sí, realizamos diagnóstico técnico y revisamos la potencia, operación y rendimiento del sistema para proponer soluciones orientadas a la mejora real.",
    },
    {
      question: "¿Ofrecen mantenimiento y soporte continuo?",
      answer:
        "Sí, contamos con servicios de mantenimiento preventivo, correctivo y asistencia técnica para garantizar la continuidad del funcionamiento.",
    },
  ];

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de MAXTERMIC",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: serviceOfferings.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "LocalBusiness",
          name: "MAXTERMIC",
        },
        areaServed: "CL",
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SeoSchema data={[organizationSchema, serviceSchema, faqSchema]} />
      <LandingPage projects={projects} />
    </>
  );
}
