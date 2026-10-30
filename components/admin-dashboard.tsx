"use client";

import { motion } from "framer-motion";
import { Cloud, Pencil, PlusCircle, ShieldCheck, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { mockProjects, type ProjectRecord } from "@/lib/projects";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const initialForm = {
  title: "",
  category: "Industrial",
  client_name: "",
  description: "",
  details: "",
  images: [] as string[],
};

const normalizeProject = (project: any): ProjectRecord => ({
  id: project.id ?? crypto.randomUUID(),
  title: project.title ?? "Proyecto sin título",
  slug: project.slug ?? project.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ?? "proyecto",
  category: project.category ?? "Industrial",
  description: project.description ?? project.details ?? "Proyecto ejecutado por MAXTERMIC.",
  client_name: project.client_name ?? "Cliente corporativo",
  images: Array.isArray(project.images) ? project.images.filter(Boolean) : [],
  created_at: project.created_at ?? new Date().toISOString(),
});

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectRecord[]>(mockProjects);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const loadProjects = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setProjects(mockProjects);
      return;
    }

    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      setProjects(mockProjects);
      return;
    }

    if (!data || data.length === 0) {
      setProjects(mockProjects);
      return;
    }

    setProjects(data.map(normalizeProject));
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
    setSelectedFiles((current) => [...current, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setForm((current) => ({ ...current, images: [...current.images, ...previews] }));
  };

  const uploadImagesToStorage = async (files: File[]) => {
    if (!isSupabaseConfigured || !supabase || files.length === 0) {
      return [];
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `projects/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-gallery")
        .upload(filePath, file, { upsert: true, contentType: file.type || "application/octet-stream" });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage.from("project-gallery").getPublicUrl(filePath);
      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedFiles([]);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setStatusMessage("El título del proyecto es obligatorio.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const remoteImages = form.images.filter((image) => !image.startsWith("blob:"));
      const uploadedUrls = await uploadImagesToStorage(selectedFiles);
      const finalImages = [...new Set([...remoteImages, ...uploadedUrls])];

      const payload = {
        title: form.title.trim(),
        slug: form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "proyecto-maxtermic",
        category: form.category,
        client_name: form.client_name.trim() || "Cliente corporativo",
        description: form.description.trim() || form.details.trim() || "Proyecto ejecutado por MAXTERMIC.",
        images: finalImages.length > 0 ? finalImages : ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"],
      };

      if (!isSupabaseConfigured || !supabase) {
        const project: ProjectRecord = {
          id: editingId ?? crypto.randomUUID(),
          title: payload.title,
          slug: payload.slug,
          category: payload.category,
          client_name: payload.client_name,
          description: payload.description,
          images: payload.images,
          created_at: new Date().toISOString(),
        };

        setProjects((current) => {
          if (editingId) {
            return current.map((item) => (item.id === editingId ? project : item));
          }
          return [project, ...current];
        });

        resetForm();
        setStatusMessage("Proyecto guardado correctamente en modo demo.");
        return;
      }

      if (editingId) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw new Error(error.message);
      }

      await loadProjects();
      resetForm();
      setStatusMessage("Proyecto sincronizado con Supabase correctamente.");
    } catch (error) {
      console.error(error);
      setStatusMessage(error instanceof Error ? error.message : "No se pudo guardar el proyecto.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: ProjectRecord) => {
    setEditingId(project.id);
    setStatusMessage("");
    setForm({
      title: project.title,
      category: project.category as string,
      client_name: project.client_name ?? "",
      description: project.description,
      details: project.description,
      images: project.images,
    });
    setSelectedFiles([]);
  };

  const handleDelete = async (projectId: string) => {
    if (!isSupabaseConfigured || !supabase) {
      setProjects((current) => current.filter((project) => project.id !== projectId));
      if (editingId === projectId) resetForm();
      return;
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId);
      if (error) throw new Error(error.message);
      setProjects((current) => current.filter((project) => project.id !== projectId));
      if (editingId === projectId) resetForm();
      setStatusMessage("Proyecto eliminado correctamente.");
    } catch (error) {
      console.error(error);
      setStatusMessage(error instanceof Error ? error.message : "No se pudo eliminar el proyecto.");
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
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? "Guardando..." : editingId ? "Guardar cambios" : "Publicar proyecto"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200">
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
              {isSupabaseConfigured ? "Supabase Live" : "Demo Mode"}
            </div>
          </div>

          {statusMessage && (
            <div className="mb-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
              {statusMessage}
            </div>
          )}

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                <img src={project.images[0] ?? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"} alt={project.title} className="h-24 w-28 rounded-xl object-cover" />
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
          {isSupabaseConfigured
            ? "Los proyectos se gestionan directamente con la tabla public.projects y el bucket project-gallery de Supabase."
            : "La app está en modo demo. Configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar la sincronización real con Supabase."}
        </p>
      </div>
    </div>
  );
}
