import { useContext, useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import type { CategoryFormData } from "../../components/CategoryForm/schema";
import {
  createCategory,
  deleteAllCategories,
  deleteCategoryById,
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
import {
  getAllTasks,
  updateTaskById,
  type Task,
} from "../../services/tasks-services";

const SideBarContainer = () => {
  const {
    tasks,
    setTasks,
    categories,
    setCategories,
    activeSidebarItem,
    setActiveSidebarItem,
    setUpdateCategories,
    completedCount,
    setCompletedCount,
    uncompletedCount,
    setUncompletedCount,
    // countCompleted,
  } = useContext(TasksContext);
  const [categoryCounts, setCategoryCounts] = useState<CountObj>({});

  //FIX
  const handleSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      await fetchCategories();
    } catch (error: any) {
      console.warn(error.message);
      console.log(error.message);
    }
  };

  const fetchCategories = async () => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.warn(error));
  };

  interface CountObj {
    [key: string]: number;
  }
  useEffect(() => {
    const countByType: CountObj = tasks.reduce(
      (countObj: CountObj, task: Task) => {
        countObj[task.category.id] = (countObj[task.category.id] || 0) + 1;
        return countObj;
      },
      {} as CountObj
    );
    setCategoryCounts(countByType);
    // setCompletedCount(countCompleted());
  }, [tasks, categories]);

  const handleClick = (number: number) => {
    setActiveSidebarItem(number);
  };

  const totalTasks = Object.values(categoryCounts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const visibleTasks = tasks.filter((task) => !task.isArchived);
  const completedTasks = visibleTasks.filter((task) => task.isCompleted);

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "ALL tasks will be deleted. Press OK to proceed or Cancel to go back."
    );
    if (confirmed) {
      await deleteAllCategories().catch((e) => console.warn(e));
      setTasks([]);
      return;
    }
    return;
  };

  const handleDeleteById = async (id: number, type: string) => {
    console.log(id, type);
    const confirmed = window.confirm(
      `All tasks in the category "${type}" will be deleted. Press OK to proceed or Cancel to go back.`
    );
    if (confirmed) {
      deleteCategoryById(id)
        .then(() => {
          setUpdateCategories(-1);
        })
        .catch((e) => {
          console.warn(e);
        });
    }
    return;
  };

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.categories_container}>
        <h2>CATEGORIES</h2>
        <div className={styles.categories}>
          <SideBarItem
            title="ALL TASKS"
            number={totalTasks}
            icon={faCircleXmark}
            index={-1}
            active={-1 === activeSidebarItem}
            onClick={() => handleClick(-1)}
            onDelete={handleDeleteAll}
          />
          {categories.map((category) => (
            <SideBarItem
              key={category.id}
              title={category.type}
              number={categoryCounts[category.id]}
              icon={faCircleXmark}
              active={category.id === activeSidebarItem}
              onClick={() => handleClick(category.id)}
              onDelete={() => handleDeleteById(category.id, category.type)}
            />
          ))}
          <CategoryForm onFormSubmit={handleSubmit} />
        </div>
      </div>
      <div className={styles.status_container}>
        <h2>STATUS</h2>
        <SideBarItem
          title="In Progress"
          number={visibleTasks.length - completedTasks.length}
          icon={faBarsProgress}
          index={-2}
          active={-2 === activeSidebarItem}
          onClick={() => handleClick(-2)}
        />
        <SideBarItem
          title="Completed"
          number={completedTasks.length}
          icon={faCircleCheck}
          index={-3}
          active={-3 === activeSidebarItem}
          onClick={() => handleClick(-3)}
        />
      </div>
    </div>
  );
};

export default SideBarContainer;
