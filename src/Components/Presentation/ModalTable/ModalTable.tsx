import { useState } from "react";
import styles from "./ModalTable.module.css";

type Props = {};

const ModalTable = (props: Props) => {
  const [tableNum, setTableNum] = useState("");

  const handleContinue = () => {
    localStorage.setItem("tableNumber", tableNum);
    window.location.reload();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalView}>
        <h3>Bienvenido</h3>
        <p>
          Por favor ingrese el número de mesa que aparece junto al código QR.
        </p>
        <input
          type="text"
          value={tableNum}
          onChange={(e) => setTableNum(e.target.value)}
          placeholder="Ingrese el número"
        />
        <button className={styles.buttonTable} onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ModalTable;
