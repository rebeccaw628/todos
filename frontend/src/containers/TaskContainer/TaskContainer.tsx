import { useContext, useEffect, useState } from "react";
import {
  SideBarFilter,
  TasksContext,
} from "../../context/TasksContextProvider";
import TaskItem from "../../components/TaskItem/TaskItem";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  updateTaskById,
  type Task,
} from "../../services/tasks-services";
import styles from "./TaskContainer.module.scss";
import TaskForm from "../../components/TaskForm/TaskForm";
import type { TaskFormData } from "../../components/TaskForm/schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskContainer = () => {
  const { tasks, setTasks, activeSidebarItem, categories, fetchAllTasks } =
    useContext(TasksContext);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editTaskId, setEditTaskId] = useState<number>(-1);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    let displayed: Task[] = [];
    switch (activeSidebarItem) {
      case SideBarFilter.ALL:
        displayed = tasks;
        break;
      case SideBarFilter.COMPLETED:
        displayed = tasks.filter((task) => task.isCompleted === true);
        break;
      case SideBarFilter.PROGRESS:
        displayed = tasks.filter((task) => task.isCompleted === false);
        break;
      default:
        displayed = tasks.filter(
          (task) => task.category.id === activeSidebarItem
        );
    }
    setDisplayedTasks(displayed);
  }, [activeSidebarItem, tasks]);

  const handleCheck = (id: number) => {
    if (completed.includes(id)) {
      setCompleted((prev) => prev.filter((completedId) => completedId != id));
    } else {
      setCompleted([...completed, id]);
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    const taskToUpdate = tasks.find((task) => task.id === id);
    updateTaskById(id, { isCompleted: !taskToUpdate?.isCompleted })
      .then(() => fetchAllTasks())
      .catch((error) => console.warn(error));
  };

  const handleDuplicate = (task: Task) => {
    const transformedData = transformData(task);
    handleSubmit(transformedData);
  };

  const transformData = (data: Task) => ({
    description: data.description,
    category: data.category.type,
    dueDate: data.dueDate,
  });

  const handleDelete = (id: number) => {
    deleteTaskById(id)
      .then(() => fetchAllTasks())
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (data: TaskFormData) => {
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
    updateTaskById(id, data)
      .then(() => {
        fetchAllTasks();
        setEditTaskId(-1);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const data = await getAllTasks();
        const checkedTasks = data
          .filter((task) => task.isCompleted)
          .map((task) => task.id);
        setCompleted(checkedTasks);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchCompleted();
  }, []);

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
      <div className={styles.task_display}>
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
              completedTasks={completed}
              onChange={() => handleCheck(task.id)}
              onUpdate={() => handleUpdate(task.id)}
              onDuplicate={() => handleDuplicate(task)}
              onDelete={() => handleDelete(task.id)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
