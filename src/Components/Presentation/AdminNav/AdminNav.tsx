import React from "react";
import styles from "./AdminNav.module.css";
import Link from "next/link";

type Props = {};

const AdminNav = (props: Props) => {
  return (
    <div className={styles.containerAdmin}>
      <span>
        <Link href="">Pedilo!</Link>
      </span>
      <div>
        <Link href="/admin/pedidos">Órdenes Pendientes</Link>
        <Link href="/admin/pedidos-entregados">Órdenes entregadas</Link>
        <Link href="/admin/productos">Menú</Link>
      </div>
      <Link href="/admin/config">Configuración</Link>
    </div>
  );
};

export default AdminNav;
