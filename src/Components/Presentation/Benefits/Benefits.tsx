"use client";
import Dropdown from "@/Components/Containers/DropDown/DropDown";
import { useState } from "react";
import { WaveBenefits } from "../Icons/Icons";
import styles from "./Benefits.module.css";

type Props = {
  id?: string;
};

const Benefits = ({ id }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (number: string) => {
    if (openDropdown === number) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(number);
    }
  };

  return (
    <div id={id} className={styles.benefitsView}>
      <h2>
        ¿Por qué elegir <strong className={styles.pedilo}>Pedilo</strong>?
      </h2>
      <div className={styles.waveContainer}>
        <WaveBenefits />
      </div>

      <div className={styles.containerDrop}>
        <Dropdown
          number="01"
          title="Ordena directamente desde la mesa"
          content="Permite a tus clientes seleccionar platos y pedir sin moverse de su sitio, ofreciendo una experiencia moderna y cómoda."
          isOpen={openDropdown === "01"}
          onToggle={() => handleToggle("01")}
        />
        <Dropdown
          number="02"
          title="Reduce tiempos de espera y mejora la eficiencia"
          content="Al digitalizar el proceso, se agilizan las ordenes, optimizando la atención y satisfaciendo a los comensales más rápidamente."
          isOpen={openDropdown === "02"}
          onToggle={() => handleToggle("02")}
        />
        <Dropdown
          number="03"
          title="Actualiza tu menú en tiempo real"
          content="Modifica precios, añade o elimina platos en segundos. Mantén a tus clientes siempre informados con la última versión."
          isOpen={openDropdown === "03"}
          onToggle={() => handleToggle("03")}
        />
        <Dropdown
          number="04"
          title="Integración fácil con tu sistema de pedidos"
          content="Nuestra plataforma se sincroniza sin complicaciones con tu sistema actual, facilitando la gestión y la transición."
          isOpen={openDropdown === "04"}
          onToggle={() => handleToggle("04")}
        />
      </div>
    </div>
  );
};

export default Benefits;
