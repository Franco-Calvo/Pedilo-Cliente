import React from "react";
import styles from "./LoaderOrder.module.css";

const LoaderOrder = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );
};

export default LoaderOrder;
