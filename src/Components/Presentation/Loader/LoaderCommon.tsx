import React from "react";
import styles from "./LoaderCommon.module.css";

const LoaderCommon = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );
};

export default LoaderCommon;
