"use client";

import { motion } from "framer-motion";
import { Cloud, Pencil, PlusCircle, ShieldCheck, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { mockProjects, type ProjectRecord } from "@/lib/projects";
import { isSupabaseConfigured, projectSelectColumns, supabase } from "@/lib/supabase";

const initialForm = {
  title: "",
  category: "Industrial",
  client_name: "",
  description: "",
  details: "",
  slug: "",
  result_key: "",
  featured: false,
  images: [] as string[],
};

const projectDescriptionDelimiter = "___MAXTERMIC_DETAILS___";
const projectResultDelimiter = "___MAXTERMIC_RESULT___";
const projectFeatureDelimiter = "___MAXTERMIC_FEATURED___";

const serializeProjectDescription = (summary: string, details: string, resultKey: string, featured: boolean) => {
  const safeSummary = summary.trim() || "Proyecto ejecutado por MAXTERMIC.";
  const safeDetails = details.trim();
  const safeResultKey = resultKey.trim();

  const chunks = [safeSummary];
  if (safeDetails) chunks.push(`${projectDescriptionDelimiter}${safeDetails}`);
  if (safeResultKey) chunks.push(`${projectResultDelimiter}${safeResultKey}`);
  chunks.push(`${projectFeatureDelimiter}${featured ? "1" : "0"}`);

  return chunks.join("");
};

const parseProjectDescription = (rawDescription?: string) => {
  const summaryFallback = "Proyecto ejecutado por MAXTERMIC.";
  if (!rawDescription) {
    return { summary: summaryFallback, details: "", resultKey: "", featured: false };
  }

  const [summaryPart, ...rest] = rawDescription.split(projectDescriptionDelimiter);
  const withoutSummary = rest.join(projectDescriptionDelimiter);
  const [detailsPart, maybeResultPart] = withoutSummary.split(projectResultDelimiter);
  const [detailsOnly, maybeFeaturedPart] = detailsPart.split(projectFeatureDelimiter);
  const resultValue = maybeResultPart ? maybeResultPart.split(projectFeatureDelimiter)[0].trim() : "";
  const featuredValue = maybeFeaturedPart ? maybeFeaturedPart.trim() : (maybeResultPart ? maybeResultPart.split(projectFeatureDelimiter)[1]?.trim() : "");

  return {
    summary: summaryPart.trim() || summaryFallback,
    details: detailsOnly.trim(),
    resultKey: resultValue,
    featured: featuredValue === "1",
  };
};

const normalizeProject = (project: any): ProjectRecord => {
  const parsedDescription = parseProjectDescription(project.description);
  const details = typeof project.details === "string" ? project.details : parsedDescription.details;
  const resultKey = typeof project.result_key === "string" ? project.result_key : parsedDescription.resultKey;
  const featured = typeof project.featured === "boolean" ? project.featured : parsedDescription.featured;

  return {
    id: project.id ?? crypto.randomUUID(),
    title: project.title ?? "Proyecto sin título",
    slug: project.slug ?? project.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ?? "proyecto",
    category: project.category ?? "Industrial",
    description: parsedDescription.summary,
    details,
    result_key: resultKey,
    featured,
    client_name: project.client_name ?? "Cliente corporativo",
    images: Array.isArray(project.images) ? project.images.filter(Boolean) : [],
    created_at: project.created_at ?? new Date().toISOString(),
  };
};

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectRecord[]>(mockProjects);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Array<{ file: File; preview: string }>>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("admin@maxtermic.cl");
  const [savingContactEmail, setSavingContactEmail] = useState(false);

  const loadProjects = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setProjects(mockProjects);
      return;
    }

    const { data, error } = await supabase.from("projects").select(projectSelectColumns).order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      setProjects(mockProjects);
      return;
    }

    if (!data || data.length === 0) {
      setProjects([]);
      return;
    }

    setProjects(data.map(normalizeProject));
  };

  useEffect(() => {
    loadProjects();

    const loadContactEmail = async () => {
      try {
        const response = await fetch("/api/site-settings");
        const payload = (await response.json()) as { contactEmail?: string };

        if (payload.contactEmail) {
          setContactEmail(payload.contactEmail);
        }
      } catch (error) {
        console.error("Error loading contact email settings:", error);
      }
    };

    loadContactEmail();
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

  const handleSaveContactEmail = async () => {
    setSavingContactEmail(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/site-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactEmail }),
      });

      const payload = (await response.json()) as { contactEmail?: string; message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "No se pudo guardar el correo destinatario.");
      }

      if (payload.contactEmail) {
        setContactEmail(payload.contactEmail);
      }

      setStatusMessage("Correo destinatario actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setStatusMessage(error instanceof Error ? error.message : "No se pudo guardar el correo destinatario.");
    } finally {
      setSavingContactEmail(false);
    }
  };

  const handleInputChange = (field: keyof typeof initialForm, value: string | string[] | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    const uploadedEntries = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((current) => [...current, ...uploadedEntries]);
    setForm((current) => ({
      ...current,
      images: [...current.images, ...uploadedEntries.map((entry) => entry.preview)],
    }));

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    const removedImage = form.images[index];

    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }));

    setSelectedFiles((current) =>
      current.filter((entry) => {
        if (!removedImage) {
          return true;
        }

        return entry.preview !== removedImage;
      }),
    );
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const nextIndex = direction === "left" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= form.images.length) {
      return;
    }

    setForm((current) => {
      const nextImages = [...current.images];
      [nextImages[index], nextImages[nextIndex]] = [nextImages[nextIndex], nextImages[index]];
      return { ...current, images: nextImages };
    });
  };

  const uploadImagesToStorage = async (files: Array<{ file: File; preview: string }>) => {
    if (!isSupabaseConfigured || !supabase || files.length === 0) {
      return [];
    }

    const uploadedUrls: string[] = [];

    for (const { file } of files) {
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
      const finalImages = Array.from(new Set([...remoteImages, ...uploadedUrls].filter(Boolean)));

      const generatedSlug = (form.slug || form.title).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "proyecto-maxtermic";
      const duplicateSlug = projects.some((project) => project.slug === generatedSlug && project.id !== editingId);

      if (duplicateSlug) {
        setStatusMessage("Ya existe un proyecto con ese slug. Usa otro nombre o deja que el sistema genere uno único.");
        return;
      }

      const payload = {
        title: form.title.trim(),
        slug: generatedSlug,
        category: form.category,
        client_name: form.client_name.trim() || "Cliente corporativo",
        description: serializeProjectDescription(form.description, form.details, form.result_key, form.featured),
        details: form.details.trim(),
        result_key: form.result_key.trim(),
        featured: form.featured,
        images: finalImages.length > 0 ? finalImages : ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"],
      };

      if (!isSupabaseConfigured || !supabase) {
        const parsedPayload = parseProjectDescription(payload.description);
        const project: ProjectRecord = {
          id: editingId ?? crypto.randomUUID(),
          title: payload.title,
          slug: payload.slug,
          category: payload.category,
          client_name: payload.client_name,
          description: parsedPayload.summary,
          details: parsedPayload.details,
          result_key: parsedPayload.resultKey,
          featured: parsedPayload.featured,
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
      details: project.details ?? "",
      slug: project.slug ?? "",
      result_key: project.result_key ?? "",
      featured: project.featured ?? false,
      images: project.images,
    });
    setSelectedFiles([]);
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm("¿Deseas eliminar este proyecto? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    if (!isSupabaseConfigured || !supabase) {
      setProjects((current) => current.filter((project) => project.id !== projectId));
      if (editingId === projectId) resetForm();
      setStatusMessage("Proyecto eliminado correctamente.");
      return;
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId);
      if (error) throw new Error(error.message);
      await loadProjects();
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

      <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Contacto</div>
            <h2 className="mt-2 text-2xl font-black text-white">Correo destinatario</h2>
          </div>
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
            Email real
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="recepcion@maxtermic.cl"
          />
          <button
            type="button"
            onClick={handleSaveContactEmail}
            disabled={savingContactEmail}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {savingContactEmail ? "Guardando..." : "Guardar correo"}
          </button>
        </div>
      </section>

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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Slug URL</label>
                <input value={form.slug} onChange={(event) => handleInputChange("slug", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="planta-de-procesamiento-minero" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Resultado clave</label>
                <input value={form.result_key} onChange={(event) => handleInputChange("result_key", event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="+32% rendimiento" />
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

            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
              <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-200">
                <span>Mostrar este proyecto en la sección destacada de Casos de Éxito</span>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => handleInputChange("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-500"
                />
              </label>
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
                    <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950/60">
                      <button type="button" onClick={() => setPreviewImage(image)} className="block w-full text-left">
                        <img src={image} alt={`Proyecto ${index + 1}`} className="h-24 w-full object-cover" />
                      </button>

                      <div className="absolute left-2 top-2 flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveImage(index, "left")}
                          disabled={index === 0}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 bg-slate-950/80 text-[10px] text-slate-200 transition hover:border-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Mover imagen ${index + 1} a la izquierda`}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, "right")}
                          disabled={index === form.images.length - 1}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 bg-slate-950/80 text-[10px] text-slate-200 transition hover:border-cyan-400/60 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Mover imagen ${index + 1} a la derecha`}
                        >
                          →
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/40 bg-slate-950/80 text-xs text-rose-200 transition hover:bg-rose-500/20"
                        aria-label={`Eliminar imagen ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {previewImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
                <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-lg text-white"
                    aria-label="Cerrar vista previa"
                  >
                    ×
                  </button>
                  <img src={previewImage} alt="Vista previa del proyecto" className="max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl" />
                </div>
              </div>
            )}

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
