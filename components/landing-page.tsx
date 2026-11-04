"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Gauge,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  Thermometer,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectImageViewer } from "@/components/project-image-viewer";
import { SiteHeader } from "@/components/site-header";
import type { ProjectRecord } from "@/lib/projects";
import { projectCategories } from "@/lib/projects";

const services = [
  {
    icon: Factory,
    title: "Climatización Industrial & VRV/VRF",
    text: "Sistemas de gran capacidad para plantas, fábricas, bodegas y procesos productivos con control preciso y alta confiabilidad.",
  },
  {
    icon: Snowflake,
    title: "Chiller & Torres de Enfriamiento",
    text: "Soluciones termodinámicas para edificios y megaproyectos con eficiencia energética y continuidad operativa garantizada.",
  },
  {
    icon: Wind,
    title: "Ventilación Mecánica & Extracción",
    text: "Diseño y ejecución de ventilación para confort, calidad de aire y evacuación en ambientes de alto requerimiento técnico.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo & Correctivo",
    text: "Programas de servicio 24/7 para optimizar consumo, prevenir fallas y prolongar la vida útil del sistema térmico.",
  },
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Cumplimiento técnico",
    text: "Normas, revisión de diseño y supervisión de obra orientada a la seguridad y la operabilidad del sistema.",
  },
  {
    icon: Gauge,
    title: "Eficiencia real",
    text: "Optimización del consumo energético con soluciones pensadas para aumentar rendimiento y reducir costos.",
  },
  {
    icon: Building2,
    title: "Escala industrial",
    text: "Experiencia en infraestructura crítica, plantas, campus y edificios con alta exigencia técnica.",
  },
  {
    icon: MessageSquareText,
    title: "Soporte continuo",
    text: "Respuesta ágil, acompañamiento operativo y mantenimiento para mantener la continuidad de la instalación.",
  },
];

const highlights = [
  { value: "+100k m²", label: "climatizados" },
  { value: "180+", label: "proyectos entregados" },
  { value: "24/7", label: "soporte técnico" },
  { value: "98%", label: "satisfacción cliente" },
];

const trustLogos = ["ABB", "Carrier", "Daikin", "Trane", "Johnson Controls", "Mitsubishi Electric"];

const testimonials = [
  {
    name: "María Riquelme",
    role: "Gerente de Infraestructura",
    quote:
      "MAXTERMIC entregó una solución robusta, con control técnico impecable y apoyo operativo durante toda la ejecución del proyecto.",
  },
  {
    name: "Luis Concha",
    role: "Director de Operaciones",
    quote:
      "La confiabilidad del sistema y la rapidez de respuesta post-entrega marcaron la diferencia en un campus industrial de alta demanda.",
  },
];

const news = [
  {
    title: "Buenas prácticas para mantener un sistema térmico sin interrupciones",
    excerpt: "Estrategias clave para reducir fallas y mejorar la continuidad operativa en instalaciones críticas.",
    date: "Ago 2026",
  },
  {
    title: "Cómo optimizar la eficiencia energética en edificios de alta demanda",
    excerpt: "Recomendaciones técnicas para equilibrar confort, consumo y sostenibilidad en proyectos institucionales.",
    date: "Jul 2026",
  },
  {
    title: "Nuevas prioridades en infraestructura térmica y ventilación",
    excerpt: "Factores relevantes para seleccionar equipos, controlar costos y mejorar la operación a largo plazo.",
    date: "Jun 2026",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

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

export function LandingPage({ projects }: { projects: ProjectRecord[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("Todos");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const featuredProjects = useMemo(() => {
    const highlighted = projects.filter((project) => project.featured === true);
    return highlighted.slice(0, 3);
  }, [projects]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};

    if (!form.name.trim()) nextErrors.name = "Ingresa tu nombre.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Email válido requerido.";
    if (!form.phone.trim()) nextErrors.phone = "Teléfono requerido.";
    if (!form.message.trim()) nextErrors.message = "Describe el requerimiento.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No se pudo enviar la solicitud.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitted(false);
      setSubmitError(error instanceof Error ? error.message : "No se pudo enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),_transparent_25%)]" />

      <SiteHeader
        title="Servicios de Climatización"
        ctaLabel="Solicitar cotización"
        ctaHref="#contacto"
      />

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-20">
          <motion.div {...reveal}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-200">
              <Gauge size={14} />
              Infraestructura térmica de alto rendimiento
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Ingeniería en <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">climatización</span> para grandes infraestructuras.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Soluciones HVAC industriales, comerciales e institucionales diseñadas para maximizar eficiencia energética, confiabilidad operativa y continuidad del servicio.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="/servicios" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                Ver servicios
                <ArrowRight size={16} />
              </a>
              <a href="/contacto" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-200">
                Contactar a un especialista
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
                  <div className="text-xl font-black text-cyan-300">{item.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} className="relative">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/75 p-5 shadow-[0_30px_80px_rgba(8,145,178,0.18)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Sistemas activos</div>
                  <div className="mt-1 text-lg font-semibold text-white">Planta Central</div>
                </div>
                <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">Online</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Eficiencia térmica", value: "92.4%", accent: "from-cyan-400 to-blue-500" },
                  { label: "Consumo energético", value: "-18.7%", accent: "from-sky-500 to-indigo-500" },
                  { label: "Temperatura estable", value: "22.4°C", accent: "from-cyan-500 to-teal-400" },
                  { label: "Tiempo de respuesta", value: "< 9 min", accent: "from-blue-500 to-cyan-400" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/65 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${item.accent}`} />
                    <div className="text-[10px] uppercase tracking-[0.24em] text-slate-400">{item.label}</div>
                    <div className="mt-2 text-2xl font-black text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/75 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-300">Operación y vigilancia</div>
                  <Thermometer className="text-cyan-300" size={18} />
                </div>
                <div className="space-y-3">
                  {[
                    ["Condensación", "96%"],
                    ["Caudal aire", "84%"],
                    ["Sistema de respaldo", "Activo"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: value === "Activo" ? "100%" : value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Propuesta de valor</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Soluciones con rigor técnico y acompañamiento real</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Servicios</p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Soluciones diseñadas para infraestructura crítica</h2>
            </div>
            <a href="/servicios" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
              Ver catálogo completo <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                <a href="/servicios" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Ver más <ArrowRight size={15} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Resultados</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Métricas que respaldan nuestra experiencia</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center">
                <div className="text-3xl font-black text-cyan-300">{item.value}</div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Obras Ejecutadas</p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Proyectos con impacto real en operación y eficiencia</h2>
            </div>
            <a href="/obras-ejecutadas" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
              Ver portafolio <ArrowRight size={15} />
            </a>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {featuredProjects.map((project) => {
                const parsedDescription = parseProjectDescription(project.description);
                const summaryText = project.description ? parsedDescription.summary : "Proyecto ejecutado por MAXTERMIC.";
                const highlightedResult = project.result_key || parsedDescription.resultKey || "Eficiencia operativa";

                return (
                  <article key={project.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_20px_50px_rgba(2,6,23,0.45)]">
                    <div className="border-b border-slate-800 bg-slate-950/40 p-3">
                      <ProjectImageViewer images={project.images ?? []} projectTitle={project.title} compact />
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">{project.category}</div>
                        {highlightedResult && (
                          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">
                            {highlightedResult}
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">{project.client_name ?? "Cliente corporativo"}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-300">{summaryText}</p>
                      <div className="mt-6 flex items-center gap-3">
                        <a href={`/obras-ejecutadas/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                          Ver detalle <ArrowRight size={15} />
                        </a>
                        <a href="/contacto" className="text-sm font-medium text-slate-300 transition hover:text-white">
                          Consultar caso
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">
              No hay proyectos destacados actualmente.
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Confianza</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Clientes y experiencias que validan nuestra forma de trabajar</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-4 flex items-center gap-1 text-cyan-300">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${testimonial.name}-${index}`} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-base leading-7 text-slate-200">“{testimonial.quote}”</p>
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Recursos</p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Últimas noticias y contenidos de interés</h2>
            </div>
            <a href="/recursos" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
              Ver todos <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {news.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.date}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.excerpt}</p>
                <a href="/recursos" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                  Leer más <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Contacto</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Hablemos de tu proyecto</h2>
                <p className="mt-4 text-slate-300">Te asesoramos en soluciones térmicas, eficiencia energética y continuidad operativa para infraestructura crítica.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="tel:+56967407770" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white">
                  <Phone size={16} />
                  Llamar ahora
                </a>
                <a href="/contacto" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950">
                  Solicitar cotización
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-900/80">
                <div className="relative h-6 w-6">
                  <div className="absolute left-0 top-1 h-4 w-1 rounded-full bg-cyan-300" />
                  <div className="absolute right-0 top-0 h-6 w-1 rounded-full bg-sky-500" />
                  <div className="absolute left-2 top-0 h-1.5 w-3 rounded-full bg-cyan-400" />
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">MAXTERMIC</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">Servicios de Climatización</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Soluciones técnicas en climatización industrial, comercial e infraestructura crítica, orientadas a eficiencia energética, continuidad operativa y resultados medibles.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Navegación</div>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {["Inicio", "Quiénes Somos", "Servicios", "Obras Ejecutadas", "Recursos", "Contacto"].map((item) => (
                <li key={item}><a href={item === "Inicio" ? "/" : item === "Quiénes Somos" ? "/quienes-somos" : item === "Servicios" ? "/servicios" : item === "Obras Ejecutadas" ? "/obras-ejecutadas" : item === "Recursos" ? "/recursos" : "/contacto"} className="transition hover:text-white">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Servicios</div>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service.title}><a href="/servicios" className="transition hover:text-white">{service.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Contacto</div>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li><a href="tel:+56967407770">+56967407770</a></li>
              <li><a href="mailto:r.alva@maxtermic.com">r.alva@maxtermic.com</a></li>
              <li>Av. Providencia 1208, Of. 207, Providencia, Santiago</li>
              <li>Atención técnica 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <span>© 2026 MAXTERMIC. Todos los derechos reservados.</span>
            <div className="flex gap-4">
              <a href="/politica-privacidad" className="transition hover:text-slate-200">Política de privacidad</a>
              <a href="/terminos" className="transition hover:text-slate-200">Términos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
