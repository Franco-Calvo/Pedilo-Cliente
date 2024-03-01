"use client";
import phone from "@/Components/Images/phoneWithBlob.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

type Props = {
  id?: string;
};

const Home = ({ id }: Props) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const phoneDesktopWidth =
    windowSize.width > 1024 ? 500 : windowSize.width < 1440 ? 350 : 500;

  return (
    <div id={id} className={styles.dashboard}>
      <span>
        <h1>Tu menú online</h1>
        <Image
          className={styles.phone}
          src={phone}
          alt="Imagen de celular"
          width={300}
          priority={true}
        />

        <p>
          Tus clientes pueden ordenar y pagar directamente desde su mesa a
          través de nuestro menú QR. Brinda una experiencia inigualable y
          descubre los <strong>beneficios</strong> de ser parte de nuestra
          plataforma.
        </p>
        <button>Transformá tu restaurante</button>
      </span>

      <Image
        className={styles.phoneDesktop}
        src={phone}
        alt="Imagen de celular"
        width={phoneDesktopWidth}
        priority={true}
      />
    </div>
  );
};

export default Home;
