import { SeoSchema } from "@/components/seo-schema";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Contacto | Cotización de climatización industrial y mantenimiento",
  description:
    "Solicite una cotización para climatización industrial, mantenimiento HVAC y soluciones térmicas para proyectos críticos en Chile.",
  alternates: {
    canonical: "/contacto",
  },
};

const faqItems = [
  "¿Atiende proyectos industriales y comerciales? Sí, MAXTERMIC trabaja con infraestructura crítica, edificios y plantas.",
  "¿Pueden evaluar un sistema existente? Sí, con diagnóstico técnico y análisis de necesidades operativas.",
  "¿Hacen cotizaciones personalizadas? Sí, cada proyecto se evalúa según requerimientos, escala y criticidad.",
];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MAXTERMIC",
  url: "https://www.maxtermic.com",
  telephone: "+56 9 6674 0770",
  email: "r.alva@maxtermic.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  areaServed: "Chile",
  description:
    "Proveedor de climatización industrial, mantenimiento HVAC e infraestructura crítica en Chile.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => {
    const [question, answer] = item.split("? ");
    return {
      "@type": "Question",
      name: `${question}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    };
  }),
};

export default function ContactoPage() {
  return (
    <>
      <SeoSchema data={[contactSchema, faqSchema]} />
      <SiteHeader title="Contacto" ctaLabel="Ver servicios" ctaHref="/servicios" />
      <ContactForm faqItems={faqItems} />
    </>
  );
}
