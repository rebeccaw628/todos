import { createContext, useEffect, useState } from "react";
import { getAllTasks, type Task } from "../services/tasks-services";
import {
  getAllCategories,
  type Category,
} from "../services/categories-services";

interface TasksContextProviderProps {
  children: React.ReactNode;
}

interface TasksContextValues {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  categories: Category[];
  setCategories: (categories: Category[]) => unknown;
  activeSidebarItem: number | string;
  setActiveSidebarItem: (item: number | string) => unknown;
  fetchAllTasks: () => unknown;
  fetchAllCategories: () => unknown;
}

export const SideBarFilter = {
  ALL: "ALL TASKS",
  COMPLETED: "Completed",
  PROGRESS: "In Progress",
};

const DefaultTasksContextValues: TasksContextValues = {
  tasks: [],
  setTasks: () => {},
  categories: [],
  setCategories: () => {},
  activeSidebarItem: SideBarFilter.ALL,
  setActiveSidebarItem: () => {},
  fetchAllTasks: () => [],
  fetchAllCategories: () => [],
};

export const TasksContext = createContext<TasksContextValues>(
  DefaultTasksContextValues
);

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSidebarItem, setActiveSidebarItem] = useState<number | string>(
    SideBarFilter.ALL
  );

  const fetchAllTasks = () => {
    getAllTasks()
      .then((data) => {
        setTasks(data.filter((task) => !task.isArchived));
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllCategories = () => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchAllCategories();
  }, [tasks]);

  return (
    <TasksContext
      value={{
        tasks,
        setTasks,
        categories,
        setCategories,
        activeSidebarItem,
        setActiveSidebarItem,
        fetchAllTasks,
        fetchAllCategories,
      }}
    >
      {children}
    </TasksContext>
  );
};

export default TasksContextProvider;
