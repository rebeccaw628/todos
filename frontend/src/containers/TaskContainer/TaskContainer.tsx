import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import TaskItem from "../../components/TaskItem/TaskItem";
import {
  createTask,
  deleteTaskById,
  getTaskById,
  type Task,
} from "../../services/tasks-services";
import styles from "./TaskContainer.module.scss";
import TaskForm from "../../components/TaskForm/TaskForm";

const TaskContainer = () => {
  const {
    tasks,
    setTasks,
    activeSidebarItem,
    categories,
    setUpdateCategories,
    fetchAllTasks,
  } = useContext(TasksContext);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    console.log(activeSidebarItem);
    //update tasks when category changes
    if (activeSidebarItem === -1) {
      setDisplayedTasks(tasks);
    } else if (activeSidebarItem > 0) {
      const newDisplay = tasks.filter(
        (task) => task.category.id === activeSidebarItem
      );
      setDisplayedTasks(newDisplay);
    } else if (activeSidebarItem === -2) {
      const newDisplay = tasks.filter((task) => task.isCompleted === false);
      setDisplayedTasks(newDisplay);
    } else if (activeSidebarItem === -3) {
      const newDisplay = tasks.filter((task) => task.isCompleted === true);
      setDisplayedTasks(newDisplay);
    }
  }, [activeSidebarItem, tasks]);
  const handleCheck = (id: number) => {
    getTaskById(id);
  };
  const handleUpdate = () => {};

  const handleDuplicate = () => {
    createTask();
  };

  const handleDelete = (id: number) => {
    console.log("deleting task" + id);
    deleteTaskById(id)
      .then(() => fetchAllTasks())
      .catch((error) => console.warn(error));
  };

  const handleSubmit = () => {};

  return (
    <div className={styles.tasks_container}>
      {/* <div className={styles.inner_container}> */}
      <h1>MY TODO LIST</h1>
      <TaskForm onSubmit={handleSubmit} categories={categories} />
      {displayedTasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          onChange={() => handleCheck(task.id)}
          onUpdate={handleUpdate}
          onDuplicate={handleDuplicate}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
      {/* </div> */}
    </div>
  );
};

export default TaskContainer;
