import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SideBarItem.module.scss";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SideBarItemProps {
  title: string;
  number: number;
  icon: IconDefinition;
  active: boolean;
  onClick: () => unknown;
  onDelete?: () => unknown;
}

const SideBarItem = ({
  title,
  number,
  icon,
  active,
  onClick,
  onDelete,
}: SideBarItemProps) => {
  return (
    <div
      className={active ? styles.active : styles.inactive}
      onClick={onClick}
      data-testid="clickedItem"
    >
      <p>{title}</p>
      <p>{number}</p>
      <FontAwesomeIcon
        icon={icon}
        onClick={onDelete}
        aria-label="delete-icon"
      />
    </div>
  );
};

export default SideBarItem;
