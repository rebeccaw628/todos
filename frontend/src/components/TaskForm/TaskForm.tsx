import { useForm } from "react-hook-form";
import { schema, type TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Category } from "../../services/categories-services";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => unknown;
  categories: Category[];
}

const TaskForm = ({ onSubmit, categories }: TaskFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_description}>
        <input
          className={styles.input}
          id="description"
          type="text"
          {...register("description")}
          placeholder="Add new task"
        />
        {errors.description && (
          <small className={styles.error}>{errors.description.message}</small>
        )}
        <div className={styles.form_duedate}>
          <label htmlFor="dueDate">Due date (Optional): </label>
          <input type="date" id="dueDate" {...register("dueDate")} />
        </div>
      </div>
      <div>
        <select defaultValue="">
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className={styles.add_btn} type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
