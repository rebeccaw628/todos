import type { TaskFormData } from "../components/TaskForm/schema";
import type { Category } from "./categories-services";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface Task {
  id: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  dueDate?: string;
  isCompleted: boolean;
  isArchived: boolean;
  category: Category;
}
interface UpdateTask {
  description?: string;
  dueDate?: string;
  category?: string;
  isArchived?: boolean;
  isCompleted?: boolean;
}

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseURL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to retrieve tasks");
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

export const updateTaskById = async (
  id: number,
  data: UpdateTask
): Promise<Task> => {
  const response = await fetch(`${baseURL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Could not find task with id ${id}`);
  }
  return await response.json();
};

export const deleteTaskById = async (id: number) => {
  console.log(id);
  const response = await fetch(`${baseURL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
};

export const createTask = async (data: TaskFormData) => {
  console.log("create task");
  const response = await fetch(`${baseURL}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create new task");
  }
  return await response.json();
};
