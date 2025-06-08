import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTaskById, type Task } from "../../services/tasks-services";
import {
  faCalendar,
  faCopy,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./TaskItem.module.scss";
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContextProvider";

interface TaskItemProps {
  task: Task;
  onChange?: () => unknown;
  onUpdate: () => unknown;
  onDuplicate: () => unknown;
  onDelete: () => unknown;
}

const TaskItem = ({
  task,
  onChange,
  onUpdate,
  onDuplicate,
  onDelete,
}: TaskItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_wrapper}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.isCompleted}
            id="checkbox"
            onChange={() => onChange}
          ></input>
          <div className={styles.content_details}>
            <p>{task.description}</p>
            {task.dueDate && (
              <div className={styles.content_duedate}>
                <FontAwesomeIcon icon={faCalendar} />
                <p>{task.dueDate}</p>
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
    </div>
  );
};

export default TaskItem;
