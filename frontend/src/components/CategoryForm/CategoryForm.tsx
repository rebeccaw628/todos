import { useForm } from "react-hook-form";
import { schema, type CategoryFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CategoryForm.module.scss";

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
  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <input
          className={styles.textInput}
          id="category"
          type="text"
          {...register("type")}
          placeholder="Add category"
        />
        {errors.type && (
          <small className={styles.error}>{errors.type.message}</small>
        )}
      </div>
      <div className={styles.submit}>
        <button className={styles.submit_btn} type="submit">
          +
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
