import React from "react";
import styles from "./CardPrice.module.css";

type Props = {
  icon: any;
  title: String;
  text: String;
};

const CardPrice = ({ icon, title, text }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <span>
        <h3>{title}</h3>
        <p>{text}</p>
      </span>
    </div>
  );
};

export default CardPrice;
