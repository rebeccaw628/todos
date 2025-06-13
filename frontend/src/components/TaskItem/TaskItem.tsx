import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Task } from "../../services/tasks-services";
import {
  faCalendar,
  faCopy,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./TaskItem.module.scss";

interface TaskItemProps {
  task: Task;
  completedTasks: number[];
  onChange?: () => unknown;
  onUpdate: () => unknown;
  onDuplicate: () => unknown;
  onDelete: () => unknown;
}

const TaskItem = ({
  task,
  completedTasks,
  onChange,
  onUpdate,
  onDuplicate,
  onDelete,
}: TaskItemProps) => {
  const displayDate = (dueDate: string) => {
    const formattedDate = new Date(dueDate).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className={styles.content}>
      <div className={styles.content_wrapper}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completedTasks && completedTasks.includes(task.id)}
          id="checkbox"
          onChange={onChange}
        ></input>
        <div className={styles.task}>
          <p className={styles.task_text}>{task.description}</p>
          {task.dueDate && (
            <div className={styles.task_duedate}>
              <FontAwesomeIcon icon={faCalendar} />
              <p>{displayDate(task.dueDate)}</p>
            </div>
          )}
        </div>
      </div>
      {task.category ? <p>{task.category.type}</p> : <p>Not categorised</p>}
      <div className={styles.btns_container}>
        <button className={styles.btns}>
          <FontAwesomeIcon icon={faPenToSquare} onClick={onUpdate} />
        </button>
        <button className={styles.btns} onClick={onDuplicate}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button className={styles.btns} onClick={onDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
