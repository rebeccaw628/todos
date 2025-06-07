import { useContext, useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import type { CategoryFormData } from "../../components/CategoryForm/schema";
import {
  createCategory,
  getAllCategories,
  type Category,
} from "../../services/categories-services";
import styles from "./SideBarContainer.module.scss";
import { TasksContext } from "../../context/TasksContextProvider";
import {
  faBarChart,
  faCircleCheck,
  faCircleXmark,
  faListAlt,
} from "@fortawesome/free-regular-svg-icons";
import SideBarItem from "../../components/SideBarItem/SideBarItem";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";

const SideBarContainer = () => {
  const { tasks, categories, setCategories } = useContext(TasksContext);
  const [categoryCounts, setCategoryCounts] = useState<CountObj>({});

  const handleSubmit = async (data: CategoryFormData) => {
    await createCategory(data);
    await fetchCategories();
  };

  const fetchCategories = async () => {
    await getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.warn(err));
  };

  interface CountObj {
    [key: string]: number;
  }

  useEffect(() => {
    const countByType: CountObj = categories.reduce((countObj, category) => {
      countObj[category.type] = (countObj[category.type] || 0) + 1;
      return countObj;
    }, {} as CountObj);
    setCategoryCounts(countByType);
  }, [tasks, categories]);

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.categories_container}>
        <h2>CATEGORIES</h2>
        <div className={styles.categories}>
          <SideBarItem
            title="ALL TASKS"
            number={tasks.length}
            icon={faCircleXmark}
          />
          {categories.map((category) => (
            <SideBarItem
              key={category.id}
              title={category.type}
              number={categoryCounts[category.type]}
              icon={faCircleXmark}
            />
          ))}
          <CategoryForm onFormSubmit={handleSubmit} />
        </div>
      </div>
      <div className={styles.status_container}>
        <h2>STATUS</h2>
        <SideBarItem
          title="In Progress"
          number={tasks.length}
          icon={faBarsProgress}
        />
        <SideBarItem
          title="Completed"
          number={tasks.length}
          icon={faCircleCheck}
        />
      </div>
    </div>
  );
};

export default SideBarContainer;
