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
}

const TaskItem = ({ task }: TaskItemProps) => {
  const handleCheck = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_wrapper}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            id="checkbox"
            onChange={handleCheck}
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
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon icon={faCopy} />
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
