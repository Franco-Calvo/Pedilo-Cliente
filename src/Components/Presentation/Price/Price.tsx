import React from "react";
import styles from "./Price.module.css";
import CardPrice from "@/Components/Containers/CardPrice/CardPrice";
import { Contract, Onboarding, Secure } from "../Icons/Icons";

type Props = {
  id?: string;
};

const   Price = ({ id }: Props) => {
  return (
    <div id={id} className={styles.priceView}>
      <h2>Nuestros precios</h2>
      <div className={styles.cardContainer}>
        <CardPrice
          icon={<Contract />}
          title="Sin mantenimiento"
          text="La creación de tu tienda es totalmente gratuita y no debes abonar nada para comenzar."
        />
        <CardPrice
          icon={<Secure />}
          title="Comisión por venta"
          text="Por cada venta que efectúes solo se descontará el 3% de la venta total como tarifa de servicio."
        />
        <CardPrice
          icon={<Onboarding />}
          title="Onboarding"
          text="Te daremos asistencia en todo el proceso de creación de tu tienda para que te sientas seguro y confiado."
        />
      </div>
    </div>
  );
};

export default Price;
