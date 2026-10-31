import { ArrowRight, Building2, Factory, Gauge, Snowflake, Wrench } from "lucide-react";

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
  return (
    <div className="bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-900/80">
              <div className="relative h-6 w-6">
                <div className="absolute left-0 top-1 h-4 w-1 rounded-full bg-cyan-300" />
                <div className="absolute right-0 top-0 h-6 w-1 rounded-full bg-sky-500" />
                <div className="absolute left-2 top-0 h-1.5 w-3 rounded-full bg-cyan-400" />
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">MAXTERMIC</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">Servicios</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {[
              ["Inicio", "/"],
              ["Quiénes Somos", "/quienes-somos"],
              ["Servicios", "/servicios"],
              ["Casos de Éxito", "/casos-de-exito"],
              ["Recursos", "/recursos"],
              ["Contacto", "/contacto"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-white">{label}</a>
            ))}
          </nav>

          <a href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950">
            Cotizar
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

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
      </main>
    </div>
  );
}
