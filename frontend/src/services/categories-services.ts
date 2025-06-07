import type { CategoryFormData } from "../components/CategoryForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${baseURL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return await response.json();
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await fetch(`${baseURL}/categories/${id}`);
  if (!response.ok) {
    throw new Error(`Could not find category with id ${id}`);
  }
  return await response.json();
};

export const createCategory = async (
  data: CategoryFormData
): Promise<Category> => {
  const response = await fetch(`${baseURL}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  return await response.json();
};
