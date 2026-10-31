import { ArrowRight } from "lucide-react";

const posts = [
  { title: "Buenas prácticas en mantenimiento preventivo", date: "08 ago 2026", excerpt: "Cómo evitar fallas críticas mediante estrategias de mantenimiento predictivo y seguimiento constante." },
  { title: "Eficiencia térmica en edificios industriales", date: "21 jul 2026", excerpt: "Recomendaciones clave para optimizar consumo, confort y continuidad operativa." },
  { title: "Nuevos estándares de climatización", date: "03 jul 2026", excerpt: "Qué considerar en inversiones y proyectos de nueva generación para infraestructura crítica." },
];

export default function RecursosPage() {
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
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-300">Recursos</div>
            </div>
          </a>
          <a href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950">
            Consultar asesoría
            <ArrowRight size={16} />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Blog y noticias</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Contenido técnico y de interés para decisiones mejor informadas.
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{post.date}</div>
              <h2 className="mt-4 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
              <a href="/contacto" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300">
                Leer más <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
