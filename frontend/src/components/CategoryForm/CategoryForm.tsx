import { useForm } from "react-hook-form";
import { schema, type CategoryFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CategoryForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface CategoryFormProps {
  onFormSubmit: (data: CategoryFormData) => unknown;
}

const CategoryForm = ({ onFormSubmit }: CategoryFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  if (isSubmitSuccessful) reset();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <input
          className={styles.input}
          id="category"
          type="text"
          {...register("type")}
          placeholder="ADD CATEGORY"
        />
        {errors.type && (
          <small className={styles.error}>{errors.type.message}</small>
        )}
      </div>
      <div>
        <button className={styles.add_btn} type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
