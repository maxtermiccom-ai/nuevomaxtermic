import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const posts = [
  { title: "Buenas prácticas en mantenimiento preventivo", date: "08 ago 2026", excerpt: "Cómo evitar fallas críticas mediante estrategias de mantenimiento predictivo y seguimiento constante." },
  { title: "Eficiencia térmica en edificios industriales", date: "21 jul 2026", excerpt: "Recomendaciones clave para optimizar consumo, confort y continuidad operativa." },
  { title: "Nuevos estándares de climatización", date: "03 jul 2026", excerpt: "Qué considerar en inversiones y proyectos de nueva generación para infraestructura crítica." },
];

export default function RecursosPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Recursos" ctaLabel="Consultar asesoría" ctaHref="/contacto" />

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
