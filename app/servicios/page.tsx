import { ArrowRight, Building2, Factory, Gauge, Snowflake, Wrench } from "lucide-react";
import { SeoSchema } from "@/components/seo-schema";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Servicios de climatización industrial y mantenimiento",
  description:
    "Servicios de climatización industrial, comercial y mantenimiento técnico para infraestructura crítica, edificios y proyectos de alto rendimiento en Chile.",
  alternates: {
    canonical: "/servicios",
  },
};

const services = [
  {
    icon: Factory,
    title: "Climatización Industrial & VRV/VRF",
    text: "Sistemas de gran capacidad y alta exigencia para plantas, fábricas y procesos productivos.",
  },
  {
    icon: Snowflake,
    title: "Chiller & Torres de Enfriamiento",
    text: "Soluciones térmicas para edificios, campus y proyectos de gran escala con alta continuidad operativa.",
  },
  {
    icon: Building2,
    title: "Climatización Comercial",
    text: "Diseño y ejecución de soluciones para edificios corporativos, centros comerciales y espacios institucionales.",
  },
  {
    icon: Gauge,
    title: "Eficiencia Energética",
    text: "Optimización real del consumo energético con enfoque en sostenibilidad, costo y rendimiento.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo y Correctivo",
    text: "Acompañamiento técnico para prolongar la vida útil de los sistemas y evitar paros operativos.",
  },
];

export default function ServiciosPage() {
  const faqItems = [
    {
      question: "¿Qué servicios de climatización ofrece MAXTERMIC?",
      answer:
        "MAXTERMIC trabaja en climatización industrial, climatización comercial, ventilación mecánica, chiller y torres de enfriamiento, además de mantenimiento preventivo y correctivo para infraestructura crítica.",
    },
    {
      question: "¿Atiende proyectos para plantas y edificios industriales?",
      answer:
        "Sí, el enfoque técnico de MAXTERMIC está orientado a proyectos industriales, corporativos e institucionales que requieren continuidad operativa, eficiencia energética y control técnico rigoroso.",
    },
    {
      question: "¿Realizan mantenimiento de sistemas existentes?",
      answer:
        "Sí, se ofrecen programas de mantenimiento preventivo y correctivo para prolongar la vida útil del sistema, mejorar rendimiento y reducir fallas operativas.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Servicios de climatización industrial y mantenimiento",
    provider: {
      "@type": "Organization",
      name: "MAXTERMIC",
      url: "https://www.maxtermic.com",
      areaServed: "CL",
    },
    areaServed: "Chile",
    description:
      "Soluciones de climatización industrial, comercial, ventilación, chillers y mantenimiento para infraestructura crítica.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "CLP",
      priceSpecification: "[AÑADIR PRECIO]",
    },
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
      <SeoSchema data={[serviceSchema, faqSchema]} />
      <div className="bg-slate-950 text-slate-100">
        <SiteHeader title="Servicios" ctaLabel="Cotizar" ctaHref="/contacto" />

        <main>
          <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Soluciones</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Soluciones térmicas para infraestructura crítica y operación continua.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Diseñamos, implementamos y acompañamos soluciones técnicas para edificios, plantas y proyectos complejos que requieren continuidad, eficiencia y seguridad operativa.
            </p>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                  <a href="/contacto" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                    Solicitar información <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Proceso</p>
                  <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Un enfoque técnico y práctico desde el diagnóstico hasta la operación</h2>
                </div>
                <div className="space-y-5">
                  {[
                    "Diagnóstico técnico y evaluación del entorno",
                    "Diseño de solución y selección de equipos",
                    "Ejecución e integración con la infraestructura",
                    "Soporte, monitoreo y mantenimiento continuo",
                  ].map((item, index) => (
                    <div key={item} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">{index + 1}</div>
                      <p className="text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Dudas más comunes sobre clima y mantenimiento</h2>
              <div className="mt-8 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
