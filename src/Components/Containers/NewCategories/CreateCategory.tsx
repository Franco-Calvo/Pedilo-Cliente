"use client";
import { createCategory } from "@/Services/Categories";
import { ICategory } from "@/Types/category";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import styles from "./CreateCategory.module.css";

type Props = {
  onAddCategory: (newCategory: ICategory) => void;
  onRefetch: () => void;
};

const CreateCategory = (props: Props) => {
  const [categoryName, setCategoryName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCreate = async () => {
    const response = await createCategory(categoryName);

    if (response.success) {
      setCategoryName("");
      toast.success(response.message);
      props.onRefetch();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className={styles.containerCreate}>
        <input
          type="text"
          placeholder="Nueva categoría"
          value={categoryName}
          onChange={handleInputChange}
        />
        <button className={styles.actionButton} onClick={handleCreate}>
          Crear categoría
        </button>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default CreateCategory;
