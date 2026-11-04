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
