import React from "react";
import styles from "./ConfirmToast.module.css";

interface ConfirmToastProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: String;
  subtitle: String;
  confirmButton?: string;
  cancelButton?: string;
  icon?: any;
}

const ConfirmToast: React.FC<ConfirmToastProps> = ({
  onConfirm,
  onCancel,
  title,
  subtitle,
  confirmButton,
  cancelButton,
  icon,
}) => {
  return (
    <div className={styles.containerToast}>
      <div className={styles.flexContainer}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>{icon}</div>
        </div>
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
          <div className={styles.subtitle}>{subtitle} </div>
          <div className={styles.buttonGroup}>
            <div className={styles.buttonWrapper}>
              <button className={styles.confirmButton} onClick={onConfirm}>
                {confirmButton}
              </button>
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.cancelButton} onClick={onCancel}>
                {cancelButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmToast;
