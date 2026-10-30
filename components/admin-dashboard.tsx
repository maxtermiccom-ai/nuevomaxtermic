"use client";

import { motion } from "framer-motion";
import { Cloud, Pencil, PlusCircle, ShieldCheck, Trash2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { mockProjects, type ProjectRecord } from "@/lib/projects";

const initialForm = {
  title: "",
  category: "Industrial",
  client_name: "",
  description: "",
  details: "",
  images: [] as string[],
};

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectRecord[]>(mockProjects);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const summary = useMemo(
    () => ({
      total: projects.length,
      industrial: projects.filter((project) => project.category === "Industrial").length,
      commercial: projects.filter((project) => project.category === "Comercial").length,
      maintenance: projects.filter((project) => project.category === "Mantenimiento").length,
    }),
    [projects],
  );

  const handleInputChange = (field: keyof typeof initialForm, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm((current) => ({ ...current, images: [...current.images, ...previews] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanImages = form.images.filter(Boolean);

    const project: ProjectRecord = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title,
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      category: form.category,
      client_name: form.client_name || "Cliente corporativo",
      description: form.description || form.details || "Proyecto ejecutado por MAXTERMIC.",
      images: cleanImages.length ? cleanImages : ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"],
      created_at: new Date().toISOString(),
    };

    setProjects((current) => {
      if (editingId) {
        return current.map((item) => (item.id === editingId ? project : item));
      }
      return [project, ...current];
    });

    setForm(initialForm);
    setEditingId(null);
  };

  const handleEdit = (project: ProjectRecord) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category as string,
      client_name: project.client_name ?? "",
      description: project.description,
      details: project.description,
      images: project.images,
    });
  };

  const handleDelete = (projectId: string) => {
    setProjects((current) => current.filter((project) => project.id !== projectId));
    if (editingId === projectId) {
      setEditingId(null);
      setForm(initialForm);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: summary.total },
          { label: "Industrial", value: summary.industrial },
          { label: "Comercial", value: summary.commercial },
          { label: "Mantenimiento", value: summary.maintenance },
        ].map((card) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{card.label}</div>
            <div className="mt-3 text-3xl font-black text-white">{card.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Proyecto</div>
              <h2 className="mt-2 text-2xl font-black text-white">{editingId ? "Editar proyecto" : "Añadir nuevo proyecto"}</h2>
            </div>
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-300">
              {editingId ? <Pencil size={18} /> : <PlusCircle size={18} />}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Título del proyecto</label>
              <input value={form.title} onChange={(event) => handleInputChange("title", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Edificio Corporativo Torre Central" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Categoría</label>
                <select value={form.category} onChange={(event) => handleInputChange("category", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400">
                  <option value="Industrial">Industrial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Institucional">Institucional</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Cliente / entidad</label>
                <input value={form.client_name} onChange={(event) => handleInputChange("client_name", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Nombre del cliente" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Descripción breve</label>
              <textarea value={form.description} onChange={(event) => handleInputChange("description", event.target.value)} rows={4} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Explica alcance, tecnología y resultados del proyecto." />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Especificaciones técnicas</label>
              <textarea value={form.details} onChange={(event) => handleInputChange("details", event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Capacidad, sistemas aplicados, nivel de control, etc." />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Imágenes del proyecto</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-4 py-5 text-sm text-cyan-200 transition hover:border-cyan-400/60">
                <Upload size={18} />
                Subir imágenes
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              {form.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {form.images.map((image, index) => (
                    <img key={`${image}-${index}`} src={image} alt="Proyecto" className="h-24 w-full rounded-xl object-cover" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950">
                {editingId ? "Guardar cambios" : "Publicar proyecto"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Galería</div>
              <h2 className="mt-2 text-2xl font-black text-white">Proyectos publicados</h2>
            </div>
            <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300">
              Supabase Ready
            </div>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <img src={project.images[0]} alt={project.title} className="h-24 w-28 rounded-xl object-cover" />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                      <Cloud size={12} />
                      {project.category}
                    </div>
                    <div className="mt-2 truncate text-lg font-semibold text-white">{project.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{project.client_name || "Cliente corporativo"}</div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEdit(project)} className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:border-cyan-400/60">
                      <Pencil size={16} />
                    </button>
                    <button type="button" onClick={() => handleDelete(project.id)} className="rounded-full border border-rose-500/40 bg-rose-500/10 p-2 text-rose-300 hover:bg-rose-500/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3 text-cyan-200">
          <ShieldCheck size={18} />
          <span className="text-sm uppercase tracking-[0.2em]">Integración con Supabase</span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Este panel está preparado para conectarse al bucket público <span className="font-semibold text-white">project-gallery</span> y a la tabla <span className="font-semibold text-white">projects</span> de Supabase. Las URLs de imagen se gestionan automáticamente en la base de datos y se publican en la web pública sin necesidad de tocar código.
        </p>
      </div>
    </div>
  );
}
