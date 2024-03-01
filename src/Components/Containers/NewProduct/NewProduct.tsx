"use client";
import { getUserCategories } from "@/Services/Categories";
import { createProduct } from "@/Services/ProductService";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import styles from "./NewProduct.module.css";

const NewProduct: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stock, setStock] = useState("Available");

  useEffect(() => {
    async function fetchData() {
      const response = await getUserCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        toast.error("No se pudieron renderizar las categorías");
      }
    }

    fetchData();
  }, []);

  const userId = localStorage.getItem("userId");

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setSelectedCategory("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      description,
      stock,
      category: selectedCategory,
      user: userId,
    };

    const response = await createProduct(productData);
    if (response.success) {
      toast.success("Producto creado");
      resetForm();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className={styles.containerProduct}>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span>
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </span>
        <span>
          <label>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </span>
        <span>
          <label>Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </span>
        <span>
          <label>Stock</label>
          <select value={stock} onChange={(e) => setStock(e.target.value)}>
            <option value={"Available"}>Disponible</option>
            <option value={"Unavailable"}>Sin stock</option>
          </select>
        </span>
        <button type="submit">Crear producto</button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default NewProduct;
