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
  // countCompleted: () => number;
  categories: Category[];
  setCategories: (categories: Category[]) => unknown;
  uncompletedCount: number;
  setUncompletedCount: (number: number) => unknown;
  activeSidebarItem: number;
  setActiveSidebarItem: (number: number) => unknown;
  updateCategories: number;
  setUpdateCategories: (number: number) => unknown;
  fetchAllTasks: () => unknown;
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
  updateCategories: 0,
  setUpdateCategories: () => {},
  fetchAllTasks: () => [],
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
  const [updateCategories, setUpdateCategories] = useState<number>(0);

  // const [changeTasks, setChangeTasks] = useState

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

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        console.log(data);
        console.log("fetch categories");
      })
      .catch((err) => console.warn(err));
  }, [tasks, updateCategories]);

  // const countCompleted = () => {
  //   tasks.reduce((count, task) => {
  //     task.isCompleted ? (count += 1) : count;
  //     return count;
  //   }, 0);
  // };

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
        updateCategories,
        setUpdateCategories,
        fetchAllTasks,
      }}
    >
      {children}
    </TasksContext>
  );
};

export default TasksContextProvider;
