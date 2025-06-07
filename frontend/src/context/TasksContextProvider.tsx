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
  setTasks: (tasks: Task[]) => unknown;
  completedCount: number;
  setCompletedCount: (number: number) => unknown;
  countCompleted: () => unknown;
  categories: Category[];
  setCategories: (categories: Category[]) => unknown;
  uncompletedCount: number;
  setUncompletedCount: (number: number) => unknown;
}

const DefaultTasksContextValues: TasksContextValues = {
  tasks: [],
  setTasks: () => {},
  completedCount: 0,
  setCompletedCount: () => {},
  countCompleted: () => 0,
  categories: [],
  setCategories: () => {},
  uncompletedCount: 0,
  setUncompletedCount: () => {},
};

export const TasksContext = createContext<TasksContextValues>(
  DefaultTasksContextValues
);

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [uncompletedCount, setUncompletedCount] = useState<number>(0);

  // const [changeTasks, setChangeTasks] = useState

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setTasks(res);
        console.log(res);
      })
      .catch((err) => console.warn(err));
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res);
        console.log(res);
        console.log("fetch categories");
      })
      .catch((err) => console.warn(err));
  }, []);

  const countCompleted = () => {
    tasks.reduce((count, task) => (task.isCompleted ? (count += 1) : count), 0);
  };

  return (
    <TasksContext
      value={{
        tasks,
        setTasks,
        completedCount,
        setCompletedCount,
        countCompleted,
        categories,
        setCategories,
        uncompletedCount,
        setUncompletedCount,
      }}
    >
      {children}
    </TasksContext>
  );
};

export default TasksContextProvider;
