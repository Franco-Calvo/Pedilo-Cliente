"use client";
import { Delete, Save } from "@/Components/Presentation/Icons/Icons";
import Loader from "@/Components/Presentation/Loader/Loader";
import ConfirmToast from "@/Components/Presentation/Toast/ConfirmToast";
import {
  deleteCategory,
  getUserCategories,
  updateCategory,
} from "@/Services/Categories";
import { ICategory, ICategoryState } from "@/Types/category";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from "sonner";
import CreateCategory from "../NewCategories/CreateCategory";
import styles from "./TableCategories.module.css";

const ProductTable: React.FC = () => {
  const [state, setState] = useState<ICategoryState>({
    categories: [],
    loading: true,
    error: null,
  });

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAddCategory = (newCategory: ICategory) => {
    setState((prev) => {
      const updatedCategories = [...prev.categories];
      updatedCategories.push({ ...newCategory });
      return {
        ...prev,
        categories: updatedCategories,
      };
    });
  };

  const fetchCategories = async () => {
    const response = await getUserCategories();
    if (response.success) {
      setState({ categories: response.data, loading: false, error: null });
    } else {
      setState({ categories: [], loading: false, error: response.message });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getUserCategories();
      if (response.success) {
        setState({ categories: response.data, loading: false, error: null });
      } else {
        setState({ categories: [], loading: false, error: response.message });
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleDelete = (id: string) => {
    const handleConfirm = async (id: string) => {
      const response = await deleteCategory(id);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          categories: prev.categories.filter((category) => category._id !== id),
        }));
        toast.success("Categoría eliminada con éxito");
      } else {
        toast.error("Error al eliminar la categoría");
      }
    };

    const handleCancel = () => {
      toast.dismiss();
    };

    toast(customToastContent(id, handleConfirm, handleCancel));
  };

  const customToastContent = (
    id: any,
    handleConfirm: any,
    handleCancel: any
  ) => (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ConfirmToast
        title={"¿Desea eliminar esta categoría?"}
        subtitle="No podrá restaurarla"
        icon={<MdDelete />}
        onConfirm={() => handleConfirm(id)}
        onCancel={handleCancel}
        confirmButton="Eliminar"
        cancelButton="Cancelar"
      />
    </div>
  );

  const handleSave = async (category: ICategory) => {
    const inputValue = inputValues[category._id];
    if (inputValue && inputValue !== category.name) {
      const response = await updateCategory(category._id, inputValue);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat._id === category._id ? { ...cat, name: inputValue } : cat
          ),
        }));
        toast.success("Categoría actualizada exitosamente.");
      } else {
        toast.error("Error al actualizar la categoría.");
      }
    }
  };

  return (
    <div className={styles.containerTables}>
      <CreateCategory
        onAddCategory={handleAddCategory}
        onRefetch={fetchCategories}
      />

      <Toaster position="top-right" style={{ position: "absolute" }} />
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Productos</th>
            <th>Fecha de creación</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {state.loading ? (
            <tr>
              <td className={styles.containerLoader} colSpan={4}>
                <Loader />
              </td>
            </tr>
          ) : state.categories.length === 0 ? (
            <tr>
              <td className={styles.containerLoader}>
                ¡Aún no has creado una categoría!
              </td>
            </tr>
          ) : (
            state.categories.map((category) => (
              <tr key={category._id}>
                <td className={styles.containerName}>
                  <input
                    type="text"
                    defaultValue={category.name}
                    onChange={(e) =>
                      handleInputChange(category._id, e.target.value)
                    }
                  />
                </td>
                <td>{category.products ? category.products.length : "0"}</td>
                <td>
                  {category.createdAt
                    ? category.createdAt.toLocaleDateString("es-ES")
                    : "Fecha no disponible"}
                </td>
                <td className={styles.containerAction}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDelete(category._id)}
                  >
                    <Delete />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleSave(category)}
                  >
                    <Save />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
