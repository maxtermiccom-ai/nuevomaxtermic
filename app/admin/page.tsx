import { AdminGuard } from "@/components/admin-guard";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.32em] text-cyan-300">Panel privado</div>
            <h1 className="mt-2 text-3xl font-black text-white">Dashboard de proyectos</h1>
          </div>
          <a href="/" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400/60">
            Volver al sitio
          </a>
        </div>
        <AdminGuard />
      </div>
    </main>
  );
}
