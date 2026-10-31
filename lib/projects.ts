export type ProjectCategory = "Industrial" | "Comercial" | "Institucional" | "Mantenimiento";

export type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory | string;
  description: string;
  details?: string;
  result_key?: string;
  featured?: boolean;
  client_name?: string;
  images: string[];
  created_at: string;
};

export const projectCategories = ["Todos", "Industrial", "Comercial", "Institucional", "Mantenimiento"] as const;

export const mockProjects: ProjectRecord[] = [
  {
    id: "p-1",
    title: "Planta de Procesamiento Minero",
    slug: "planta-de-procesamiento-minero",
    category: "Industrial",
    description:
      "Sistema integral de climatización para planta de alta carga térmica con extractores, chillers y control BMS para continuidad operativa.",
    client_name: "Grupo Minero Andino",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    ],
    created_at: "2024-11-18T12:00:00.000Z",
  },
  {
    id: "p-2",
    title: "Centro Comercial Paseo del Mar",
    slug: "centro-comercial-paseo-del-mar",
    category: "Comercial",
    description:
      "Diseño y puesta en marcha de VRF para zonas comerciales, control climático zonificado y eficiencia energética para grandes superficies.",
    client_name: "Paseo del Mar SA",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    created_at: "2024-09-05T12:00:00.000Z",
  },
  {
    id: "p-3",
    title: "Hospital Regional Norte",
    slug: "hospital-regional-norte",
    category: "Institucional",
    description:
      "Proyecto de climatización de alta confiabilidad para áreas críticas, salas de operación, laboratorios y circulación de aire controlada.",
    client_name: "Corporación Salud Norte",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895973?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
    ],
    created_at: "2024-07-18T12:00:00.000Z",
  },
  {
    id: "p-4",
    title: "Campus Logístico Álvarez",
    slug: "campus-logistico-alvarez",
    category: "Mantenimiento",
    description:
      "Optimización de planta de frío, renovación de torres y ajuste de flujo para reducción de consumo energético y fallas operativas.",
    client_name: "Álvarez Logistics",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    ],
    created_at: "2024-04-28T12:00:00.000Z",
  },
];
