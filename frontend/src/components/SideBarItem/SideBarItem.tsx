import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Category } from "../../services/categories-services";
import styles from "./SideBarItem.module.scss";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface CategoryItemProps {
  title: string;
  number: number;
  icon: IconDefinition;
}

const CategoryItem = ({ title, number, icon }: CategoryItemProps) => {
  return (
    <div className={styles.sidebarItem}>
      <p>{title}</p>
      <p>{number}</p>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default CategoryItem;
