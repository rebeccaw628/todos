import { useForm } from "react-hook-form";
import { schema, type TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import type { Category } from "../../services/categories-services";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => unknown;
  categories: Category[];
  formType: String;
  existingTask?: TaskFormData;
}

const TaskForm = ({
  onSubmit,
  categories,
  formType,
  existingTask,
}: TaskFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: existingTask,
  });

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_description}>
        <div className={styles.text_error_wrapper}>
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
        </div>
        <div className={styles.text_error_wrapper}>
          <div className={styles.form_duedate}>
            <label htmlFor="dueDate">Due date (Optional): </label>
            <input type="date" id="dueDate" {...register("dueDate")} />
          </div>
          {errors.dueDate && (
            <small className={styles.error}>{errors.dueDate.message}</small>
          )}
        </div>
      </div>
      <div>
        <div className={styles.text_error_wrapper}>
          <select
            defaultValue=""
            id="category"
            {...register("category", { required: true })}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.type}>
                {category.type}
              </option>
            ))}
          </select>
          {errors.category && (
            <small className={styles.error}>{errors.category.message}</small>
          )}
        </div>
      </div>
      <div>
        <button className={styles.add_btn} type="submit">
          <FontAwesomeIcon
            className={styles.icons}
            icon={formType === "create" ? faSquarePlus : faCircleCheck}
          />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
