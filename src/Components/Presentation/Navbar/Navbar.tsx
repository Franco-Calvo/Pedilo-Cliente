"use client";
import firstlogo from "@/Components/Images/firstlogo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

type Props = {};

function handleScroll(event: any, targetId: any) {
  event.preventDefault();
  const target = document.getElementById(targetId);
  if (target) {
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  }
}

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Image src={firstlogo} alt="logo" width={100} priority={true} />
      <div className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        <input type="checkbox" />

        <div className={styles.containerSpan}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        className={`${styles.containerLinks} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <ul className={styles.menu}>
          <a href="#" onClick={(e) => handleScroll(e, "home")}>
            <li>Inicio</li>
          </a>
          <a href="#" onClick={(e) => handleScroll(e, "prices")}>
            <li>Precios</li>
          </a>
          <a href="#" onClick={(e) => handleScroll(e, "benefits")}>
            <li>Beneficios</li>
          </a>
          <Link href="/ingresar" className={styles.login}>
            <li>Iniciar Sesión</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
