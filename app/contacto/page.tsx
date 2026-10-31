import { ArrowRight, MapPin, MessageSquareText, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function ContactoPage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader title="Contacto" ctaLabel="Ver servicios" ctaHref="/servicios" />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Formulario</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Hablemos de tu proyecto</h1>
            <form className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Nombre</label>
                <input className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Empresa</label>
                <input className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="Nombre de la empresa" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="correo@empresa.cl" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Teléfono</label>
                <input className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="+56 9 0000 0000" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">Servicio requerido</label>
                <input className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="Climatización industrial, mantenimiento, etc." />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-slate-300">Mensaje</label>
                <textarea rows={5} className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500" placeholder="Cuéntanos tus necesidades" />
              </div>
              <div className="sm:col-span-2">
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950">
                  Enviar solicitud
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <Phone size={18} />
                <h2 className="text-lg font-semibold text-white">Contacto directo</h2>
              </div>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li>+56967407770</li>
                <li>contacto@maxtermic.com</li>
                <li>Santiago, Chile</li>
              </ul>
            </div>

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <MapPin size={18} />
                <h2 className="text-lg font-semibold text-white">Sede</h2>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Av. Principal 1234, Oficina 100, Santiago Centro, Chile.
              </p>
            </div>

            <div className="rounded-[30px] border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center gap-3 text-cyan-300">
                <MessageSquareText size={18} />
                <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>¿Atención a proyectos industriales? Sí.</li>
                <li>¿Mantenimiento de sistemas existentes? Sí.</li>
                <li>¿Cotizaciones personalizadas? Sí, con diagnóstico técnico.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
