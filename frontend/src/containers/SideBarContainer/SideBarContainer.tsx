import { useContext, useEffect, useState } from "react";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import type { CategoryFormData } from "../../components/CategoryForm/schema";
import {
  createCategory,
  deleteAllCategories,
  deleteCategoryById,
} from "../../services/categories-services";
import styles from "./SideBarContainer.module.scss";
import { TasksContext } from "../../context/TasksContextProvider";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import SideBarItem from "../../components/SideBarItem/SideBarItem";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { type Task } from "../../services/tasks-services";
import { SideBarFilter } from "../../services/utils";

const SideBarContainer = () => {
  const {
    tasks,
    setTasks,
    categories,
    activeSidebarItem,
    setActiveSidebarItem,
    fetchAllCategories,
    fetchAllTasks,
    notify,
  } = useContext(TasksContext);
  const [categoryCounts, setCategoryCounts] = useState<CountObj>({});

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      await fetchAllCategories();
    } catch (error: any) {
      console.warn(error.message);
    }
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
  }, [tasks, categories]);

  const handleClick = (sideBarItem: string | number) => {
    setActiveSidebarItem(sideBarItem);
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
    const confirmed = window.confirm(
      `All tasks in the category "${type}" will be deleted. Press OK to proceed or Cancel to go back.`
    );
    if (confirmed) {
      deleteCategoryById(id)
        .then(() => {
          fetchAllCategories();
          fetchAllTasks();
          notify("Selected category and all related tasks deleted.");
          setActiveSidebarItem(SideBarFilter.ALL);
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
            title={SideBarFilter.ALL}
            number={totalTasks}
            icon={faCircleXmark}
            active={SideBarFilter.ALL === activeSidebarItem}
            onClick={() => handleClick(SideBarFilter.ALL)}
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
          title={SideBarFilter.PROGRESS}
          number={visibleTasks.length - completedTasks.length}
          icon={faBarsProgress}
          active={SideBarFilter.PROGRESS === activeSidebarItem}
          onClick={() => handleClick(SideBarFilter.PROGRESS)}
        />
        <SideBarItem
          title={SideBarFilter.COMPLETED}
          number={completedTasks.length}
          icon={faCircleCheck}
          active={SideBarFilter.COMPLETED === activeSidebarItem}
          onClick={() => handleClick(SideBarFilter.COMPLETED)}
        />
      </div>
    </div>
  );
};

export default SideBarContainer;
