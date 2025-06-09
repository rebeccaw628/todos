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
  // setTasks: (tasks: Task[]) => unknown;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedCount: number;
  setCompletedCount: (number: number) => unknown;
  categories: Category[];
  setCategories: (categories: Category[]) => unknown;
  uncompletedCount: number;
  setUncompletedCount: (number: number) => unknown;
  activeSidebarItem: number;
  setActiveSidebarItem: (number: number) => unknown;
  fetchAllTasks: () => unknown;
  fetchAllCategories: () => unknown;
}

const DefaultTasksContextValues: TasksContextValues = {
  tasks: [],
  setTasks: () => {},
  completedCount: 0,
  setCompletedCount: () => {},
  // countCompleted: () => 0,
  categories: [],
  setCategories: () => {},
  uncompletedCount: 0,
  setUncompletedCount: () => {},
  activeSidebarItem: -1,
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
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [uncompletedCount, setUncompletedCount] = useState<number>(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState<number>(-1);

  const fetchAllTasks = () => {
    getAllTasks()
      .then((data) => {
        setTasks(data.filter((task) => !task.isArchived));
        console.log(data);
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
        console.log(data);
        console.log("fetch categories");
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchAllCategories();
  }, [tasks]);

  // useEffect(() => {
  //   getAllCategories()
  //     .then((data) => {
  //       setCategories(data);
  //       console.log(data);
  //       console.log("fetch categories");
  //     })
  //     .catch((err) => console.warn(err));
  // }, [tasks, updateCategories]);

  return (
    <TasksContext
      value={{
        tasks,
        setTasks,
        completedCount,
        setCompletedCount,
        // countCompleted,
        categories,
        setCategories,
        uncompletedCount,
        setUncompletedCount,
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
