import { ArrowRight, BadgeCheck, Building2, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const values = [
  { icon: ShieldCheck, title: "Seguridad", text: "Trabajamos con estándares técnicos rigurosos y protocolos responsables para cada proyecto." },
  { icon: Target, title: "Eficiencia", text: "Diseñamos soluciones orientadas a optimizar consumo y continuidad operativa." },
  { icon: Sparkles, title: "Excelencia", text: "Cada proyecto se ejecuta con precisión, acompañamiento y control de calidad." },
];

const leadership = [
  { name: "Director General", role: "Visión y estrategia", text: "Encargado de la dirección institucional y crecimiento a largo plazo." },
  { name: "Gerente de Operaciones", role: "Infraestructura y continuidad", text: "Supervisa ejecución, operación y soporte técnico en activos críticos." },
  { name: "Jefe de Proyectos", role: "Diseño y ejecución", text: "Coordina proyectos, alcances y entregas con rigor metodológico." },
  { name: "Responsable Comercial", role: "Relación con clientes", text: "Acompaña la cotización, el diagnóstico y la solución a medida." },
];

export default function QuienesSomosPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Quiénes Somos" ctaLabel="Contactar" ctaHref="/contacto" />

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Nuestra historia</p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Solidez técnica, experiencia real y visión de largo plazo.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                MAXTERMIC nació para atender proyectos donde la seguridad, la continuidad operativa y la eficiencia energética no son opcionales. A lo largo del tiempo, hemos apoyado infraestructuras industriales, comerciales e institucionales con soluciones robustas, sostenibles y de alta confiabilidad.
              </p>
            </div>
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Trayectoria</div>
                    <div className="text-xl font-semibold text-white">Más de 15 años</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "Desarrollo de proyectos de infraestructura crítica",
                    "Atención a clientes industriales y corporativos",
                    "Acompañamiento técnico en operación y mantenimiento",
                    "Soluciones adaptadas a cada necesidad del cliente",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      <p className="text-sm text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Nuestra esencia</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Misión, visión y valores</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Misión</p>
              <h3 className="mt-4 text-2xl font-bold text-white">Entregar soluciones térmicas confiables y sostenibles.</h3>
              <p className="mt-4 text-slate-300">
                Diseñamos e implementamos sistemas que aportan eficiencia energética, seguridad y continuidad operativa para cada cliente, con rigor técnico y alto estándar de servicio.
              </p>
            </div>
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Visión</p>
              <h3 className="mt-4 text-2xl font-bold text-white">Ser referente en infraestructura térmica y eficiencia operativa.</h3>
              <p className="mt-4 text-slate-300">
                Contribuir a la sostenibilidad y productividad de la industria, edificios e infraestructura crítica mediante soluciones inteligentes y de alta confiabilidad.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Liderazgo</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Equipo directivo y experiencia de conducción</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {leadership.map((person) => (
              <div key={person.name} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 text-cyan-200">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-semibold text-white">{person.name}</h3>
                <p className="mt-1 text-sm text-cyan-300">{person.role}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{person.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Certificaciones y cumplimiento</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Responsabilidad técnica y estándares de calidad</h2>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-cyan-200">
                <BadgeCheck size={18} />
                Cumplimiento normativo
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "Normas y procedimientos técnicos",
                "Supervisión de obra y calidad",
                "Alineación con exigencias de infraestructura crítica",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-8 sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Contacto</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Conversación técnica y atención personalizada</h2>
              </div>
              <a href="/contacto" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950">
                Solicitar cotización
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
