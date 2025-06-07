import type { Category } from "./categories-services";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface Task {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  isArchived: boolean;
  category: Category;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseURL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return await response.json();
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await fetch(`${baseURL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error(`Could not find task with id ${id}`);
  }
  return await response.json();
};

// export const updateTaskById = async (id: number, data: ): Promise<Task> => {
//   const response = await fetch(`${baseURL}/tasks/${id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     throw new Error(`Could not find task with id ${id}`);
//   }
//   return await response.json();
// };
