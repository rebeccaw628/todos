import { useContext } from "react";
import { TasksContext } from "../../context/TasksContextProvider";
import TaskItem from "../../components/TaskItem/TaskItem";
import { type Task } from "../../services/tasks-services";
import styles from "./TaskContainer.module.scss";

const TaskContainer = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  // const handleCheck = () => {
  //   setTasks()
  // }

  return (
    <div>
      <h1>TASKS</h1>
      {tasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskContainer;
