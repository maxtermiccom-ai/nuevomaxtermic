import { ArrowRight } from "lucide-react";

const cases = [
  {
    title: "Campus industrial de alta demanda",
    label: "Operación crítica",
    text: "Solución integral para continuidad térmica y reducción del consumo energético en infraestructura industrial de gran escala.",
  },
  {
    title: "Centro comercial institucional",
    label: "Confort y eficiencia",
    text: "Optimización de sistemas de climatización para mejorar experiencia de usuarios y estabilidad operativa.",
  },
  {
    title: "Planta de producción",
    label: "Continuidad operativa",
    text: "Proyecto de climatización y ventilación con controles precisos para continuidad de proceso sin interrupciones.",
  },
];

export default function CasosPage() {
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
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">Casos de éxito</div>
            </div>
          </a>
          <a href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950">
            Cotizar proyecto
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Portafolio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Proyectos que entregan eficiencia, continuidad y confianza.
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">{item.label}</div>
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{item.text}</p>
              <a href="/contacto" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                Consultar caso <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
