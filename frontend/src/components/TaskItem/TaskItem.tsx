import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Task } from "../../services/tasks-services";
import {
  faCalendar,
  faCopy,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./TaskItem.module.scss";
import { displayDate } from "../../services/utils";

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
            <div className={styles.task_duedate} data-testid="dateDisplay">
              <FontAwesomeIcon icon={faCalendar} />
              <p>{displayDate(task.dueDate)}</p>
            </div>
          )}
        </div>
      </div>
      <p>{task.category.type}</p>
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
