import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Category } from "../../services/categories-services";
import styles from "./SideBarItem.module.scss";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContextProvider";

interface SideBarItemProps {
  title: string;
  number: number;
  icon: IconDefinition;
  index?: number;
  active: boolean;
  onClick: () => unknown;
  onDelete?: () => unknown;
}

const SideBarItem = ({
  title,
  number,
  icon,
  index,
  active,
  onClick,
  onDelete,
}: SideBarItemProps) => {
  return (
    <div className={active ? styles.active : styles.inactive} onClick={onClick}>
      <p>{title}</p>
      <p>{number}</p>
      <FontAwesomeIcon icon={icon} onClick={onDelete} />
    </div>
  );
};

export default SideBarItem;
