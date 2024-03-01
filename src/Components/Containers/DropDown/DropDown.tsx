import { ArrowDown } from "@/Components/Presentation/Icons/Icons";
import React from "react";
import styles from "./DropDown.module.css";

interface Props {
  title: string;
  content: React.ReactNode;
  number: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown: React.FC<Props> = ({
  title,
  content,
  number,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.title} onClick={onToggle}>
        <span>
          <p className={styles.number}>{number}</p>
          <p className={styles.titleView}>{title}</p>
        </span>
        <div className={`${styles.arrow} ${isOpen ? styles.arrowRotated : ""}`}>
          <ArrowDown color="#e53c5d" />
        </div>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
