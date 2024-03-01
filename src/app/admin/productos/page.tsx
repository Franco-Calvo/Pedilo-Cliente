"use client";
import ProductTable from "@/Components/Containers/Categories/TableCategories";
import NewProduct from "@/Components/Containers/NewProduct/NewProduct";
import ProductsTable from "@/Components/Containers/ProductsTable/ProductsTable";
import { useState } from "react";
import styles from "./productos.module.css";

type Props = {};

function Page({}: Props) {
  const [showTable, setShowTable] = useState("productos");

  const handleTableSwitch = (table: string) => {
    setShowTable(table);
  };

  return (
    <div className={styles.containerProducts}>
      <div className={styles.containerView}>
        <div className={styles.containerLinks}>
          <span
            className={showTable === "productos" ? styles.activeTab : ""}
            onClick={() => handleTableSwitch("productos")}
          >
            Productos
          </span>
          <hr />

          <span
            className={showTable === "newProduct" ? styles.activeTab : ""}
            onClick={() => handleTableSwitch("newProduct")}
          >
            Nuevo producto
          </span>
          <hr />

          <span
            className={showTable === "categorias" ? styles.activeTab : ""}
            onClick={() => handleTableSwitch("categorias")}
          >
            Categorías
          </span>
        </div>
        <div className={styles.containerCategories}>
          {showTable === "productos" && <ProductsTable />}
          {showTable === "categorias" && <ProductTable />}
          {showTable === "newProduct" && <NewProduct />}
        </div>
      </div>
    </div>
  );
}

export default Page;
