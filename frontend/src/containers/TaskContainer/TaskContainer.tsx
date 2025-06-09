import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import TaskItem from "../../components/TaskItem/TaskItem";
import {
  createTask,
  deleteTaskById,
  getTaskById,
  updateTaskById,
  type Task,
} from "../../services/tasks-services";
import styles from "./TaskContainer.module.scss";
import TaskForm from "../../components/TaskForm/TaskForm";
import type { TaskFormData } from "../../components/TaskForm/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number>(-1);

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

  const handleDuplicate = (task: Task) => {
    console.log("duplicating task");
    const transformedData = transformData(task);
    handleSubmit(transformedData);
  };

  const transformData = (data: Task) => ({
    description: data.description,
    category: data.category.type,
    dueDate: data.dueDate,
  });

  const handleDelete = (id: number) => {
    console.log("deleting task" + id);
    deleteTaskById(id)
      .then(() => fetchAllTasks())
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data: TaskFormData) => {
    console.log("creating new task:" + data.description);
    createTask(data)
      .then(() => fetchAllTasks())
      .catch((error) => console.warn(error));
  };

  const toggle = () => {
    setShowForm(!showForm);
  };

  const handleUpdate = (id: number) => {
    setEditTaskId(id);
  };

  const handleSave = (id: number, data: TaskFormData) => {
    console.log(
      "saving edited task with new data:" + data.description,
      data.category,
      data.dueDate
    );

    updateTaskById(id, data)
      .then(() => {
        fetchAllTasks();
        setEditTaskId(-1);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div className={styles.tasks_container}>
      <div className={styles.heading_container}>
        <h1>MY TODO LIST</h1>
        <button onClick={toggle} className={styles.toggle}>
          {showForm ? (
            <FontAwesomeIcon icon={faCircleXmark} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
      {showForm && (
        <TaskForm
          onSubmit={handleSubmit}
          categories={categories}
          formType={"create"}
        />
      )}
      {displayedTasks.map((task: Task) =>
        editTaskId === task.id ? (
          <TaskForm
            key={task.id}
            onSubmit={(data) => handleSave(task.id, data)}
            categories={categories}
            existingTask={{
              description: task.description,
              category: task.category.type,
              dueDate: task.dueDate,
            }}
            formType={"edit"}
          />
        ) : (
          <TaskItem
            key={task.id}
            task={task}
            onChange={() => handleCheck(task.id)}
            onUpdate={() => handleUpdate(task.id)}
            onDuplicate={() => handleDuplicate(task)}
            onDelete={() => handleDelete(task.id)}
          />
        )
      )}
    </div>
  );
};

export default TaskContainer;
