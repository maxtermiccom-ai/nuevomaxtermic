"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Gauge,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  ShieldCheck,
  X,
  Snowflake,
  Star,
  Thermometer,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

export function LandingPage({ projects }: { projects: ProjectRecord[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof projectCategories)[number]>("Todos");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,210,255,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.18),_transparent_25%)]" />

      <header
        style={{ position: "sticky", top: 0, zIndex: 50 }}
        className={`border-b transition-all duration-300 ${isScrolled ? "border-cyan-500/30 bg-slate-950/85 shadow-[0_12px_30px_rgba(2,6,23,0.55)] backdrop-blur-xl" : "border-slate-800/80 bg-slate-950/70 backdrop-blur-md"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-900/80 shadow-[0_0_22px_rgba(0,210,255,0.35)]">
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
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {[
              ["Inicio", "#inicio"],
              ["Servicios", "#servicios"],
              ["Proyectos", "#proyectos"],
              ["Nosotros", "#nosotros"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+56900000000" className="hidden rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/60 hover:text-white sm:inline-flex">
              Llamar ahora
            </a>
            <a href="/admin/login" className="hidden rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/15 sm:inline-flex">
              Panel
            </a>
            <a href="#contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.45)] transition hover:brightness-110">
              Solicitar cotización
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-200 md:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`${isMobileMenuOpen ? "block" : "hidden"} border-t border-slate-800 bg-slate-950/95 md:hidden`}>
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-6">
            {[
              ["Inicio", "#inicio"],
              ["Servicios", "#servicios"],
              ["Proyectos", "#proyectos"],
              ["Nosotros", "#nosotros"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900 hover:text-white"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 grid gap-2 pt-2">
              <a href="tel:+56900000000" className="rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-medium text-slate-100 transition hover:border-cyan-400/60">
                Llamar ahora
              </a>
              <a href="/admin/login" className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 text-center text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/15">
                Panel
              </a>
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-semibold text-slate-950">
                Solicitar cotización
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="inicio" className="scroll-mt-24">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-20 lg:pt-12">
          <motion.div {...reveal}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-200">
              <Gauge size={14} />
              Infraestructura térmica de alto rendimiento
            </div>

            <h1 className="max-w-xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Ingeniería en <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">climatización</span> para grandes infraestructuras.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Soluciones HVAC industriales, comerciales e institucionales diseñadas para maximizar eficiencia energética, confiabilidad operativa y confort térmico en edificios y plantas de gran escala.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#proyectos" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100">
                Ver proyectos realizados
                <ArrowRight size={16} />
              </a>
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-200">
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
                  { label: "Temperatura stable", value: "22.4°C", accent: "from-cyan-500 to-teal-400" },
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
                      <div className="mb-1 flex justify-between text-xs text-slate-300">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: label === "Sistema de respaldo" ? "100%" : label === "Condensación" ? "96%" : "84%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text }) => (
              <motion.div key={title} {...reveal} className="rounded-[26px] border border-slate-800/80 bg-slate-900/70 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:border-cyan-400/50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-300">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="servicios" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Servicios</div>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Soluciones de climatización para las operaciones más exigentes.</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} {...reveal} className="group rounded-[28px] border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.28)] transition duration-200 hover:-translate-y-1 hover:border-cyan-400/55 hover:shadow-[0_22px_60px_rgba(34,211,238,0.12)]">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
                  <Icon size={26} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm leading-7 text-slate-300">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Proyectos</div>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Casos de éxito en infraestructura crítica.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${activeCategory === category ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-200" : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <motion.article key={project.id} {...reveal} className="overflow-hidden rounded-[26px] border border-slate-800 bg-slate-900/70">
                <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative h-72 overflow-hidden">
                    <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                        <Building2 size={16} className="text-cyan-300" />
                        {project.client_name ?? "Cliente corporativo"}
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-sm text-slate-300">
                      <span className="flex items-center gap-2"><MapPin size={15} className="text-cyan-300" />Latinoamérica</span>
                      <button type="button" className="inline-flex items-center gap-2 font-medium text-cyan-300 transition hover:text-cyan-200">
                        Ver alcance <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="nosotros" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-[32px] border border-slate-800 bg-slate-900/70 p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...reveal}>
              <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Confianza</div>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Garantía técnica, seguridad y ejecución orientada a resultados.</h2>
              <div className="mt-8 space-y-5 text-slate-300">
                {[
                  "Diseño técnico basado en normas y estándares internacionales.",
                  "Comités de seguridad, revisión de proyectos y supervisión de campo.",
                  "Soporte integral para mantenedores, operadores y equipos de infraestructura.",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 text-cyan-300" size={18} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...reveal} className="space-y-8">
              <div className="flex flex-wrap gap-3">
                {trustLogos.map((logo) => (
                  <div key={logo} className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {logo}
                  </div>
                ))}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <ShieldCheck className="mb-3 text-cyan-300" size={24} />
                  <div className="text-lg font-semibold text-white">Cumplimiento normativo</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Protocolos de seguridad, medición y evaluación continua para instalaciones críticas.</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <Zap className="mb-3 text-cyan-300" size={24} />
                  <div className="text-lg font-semibold text-white">Eficiencia energétic</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Optimización del consumo con análisis técnico y soluciones inteligentes.</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {testimonials.map((quote) => (
                  <div key={quote.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                    <div className="mb-3 flex gap-1 text-cyan-300">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${quote.name}-${index}`} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm leading-7 text-slate-300">“{quote.quote}”</p>
                    <div className="mt-5">
                      <div className="font-semibold text-white">{quote.name}</div>
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{quote.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div {...reveal} className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-7">
              <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Contacto</div>
              <h2 className="mt-4 text-3xl font-black text-white">Cotiza tu proyecto con un equipo técnico de referencia.</h2>
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <Phone className="mt-1 text-cyan-300" size={18} />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Línea directa</div>
                    <a href="tel:+56900000000" className="mt-2 block text-lg font-semibold text-white">+56 9 0000 0000</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <MessageSquareText className="mt-1 text-cyan-300" size={18} />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Atención rápida</div>
                    <a href="https://wa.me/56900000000?text=Hola%20MAXTERMIC%2C%20necesito%20cotizar%20un%20proyecto%20de%20climatizaci%C3%B3n." target="_blank" rel="noreferrer" className="mt-2 block text-lg font-semibold text-white">WhatsApp comercial</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <MapPin className="mt-1 text-cyan-300" size={18} />
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Sede / coordinación</div>
                    <div className="mt-2 text-lg font-semibold text-white">Santiago, Chile</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...reveal} className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-7">
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">Nombre</label>
                    <input id="name" value={form.name} onChange={(event) => handleChange("name", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Tu nombre" />
                    {errors.name && <span className="mt-2 block text-xs text-rose-300">{errors.name}</span>}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-200">Empresa</label>
                    <input id="company" value={form.company} onChange={(event) => handleChange("company", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Nombre de la empresa" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                    <input id="email" type="email" value={form.email} onChange={(event) => handleChange("email", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="contacto@empresa.cl" />
                    {errors.email && <span className="mt-2 block text-xs text-rose-300">{errors.email}</span>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">Teléfono</label>
                    <input id="phone" value={form.phone} onChange={(event) => handleChange("phone", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="+56 9 1234 5678" />
                    {errors.phone && <span className="mt-2 block text-xs text-rose-300">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">Necesidad del proyecto</label>
                  <textarea id="message" value={form.message} onChange={(event) => handleChange("message", event.target.value)} rows={6} className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400" placeholder="Detalle del tipo de instalación, superficie, prioridad y alcance requerido." />
                  {errors.message && <span className="mt-2 block text-xs text-rose-300">{errors.message}</span>}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.35)] transition hover:brightness-110">
                    Enviar solicitud
                    <ArrowRight size={16} />
                  </button>
                  {submitted && <span className="text-sm font-medium text-emerald-300">Solicitud enviada correctamente.</span>}
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-cyan-300">Acceso administrativo</div>
            <h3 className="mt-2 text-2xl font-black text-white">Gestiona la galería de proyectos</h3>
          </div>
          <a href="/admin/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/15">
            Ingresar al panel
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <a href="https://wa.me/56900000000?text=Hola%20MAXTERMIC%2C%20quiero%20cotizar%20un%20proyecto%20de%20climatizaci%C3%B3n." target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_16px_30px_rgba(16,185,129,0.45)] transition hover:scale-105">
        <MessageSquareText size={22} />
      </a>
    </div>
  );
}
