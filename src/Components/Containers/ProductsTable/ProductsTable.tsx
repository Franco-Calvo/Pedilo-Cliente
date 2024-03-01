"use client";
import { Delete, Save } from "@/Components/Presentation/Icons/Icons";
import Loader from "@/Components/Presentation/Loader/Loader";
import { getUserCategories } from "@/Services/Categories";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/Services/ProductService";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import styles from "./ProductsTable.module.css";

type Product = {
  id: string;
  name: string;
  _id: string;
  price: string;
  category: string;
  description: string;
  stock: "Available" | "Unavailable";
};

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editedProducts, setEditedProducts] = useState<{
    [key: string]: Product;
  }>({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const data = await getProducts();
      const userCategories: any = await getUserCategories();
      setProducts(data);
      setCategories(userCategories.data);

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
    return toast.success("Se eliminó correctamente");
  };

  const handleInputChange = (id: string, key: keyof Product, value: any) => {
    setEditedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    const editedProduct = editedProducts[id];
    if (editedProduct) {
      const response = await updateProduct(id, editedProduct);
      return toast.success("El producto se actualizó correctamente");
    } else {
      return toast.error("Se produjo un error al actualizar tu producto");
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const sortedProducts = [...products].sort((a, b) => {
    return a.category.localeCompare(b.category);
  });

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return (
      <p className={styles.noProducts}>Aún no has creado ningún producto.</p>
    );
  }

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Descripción</th>
          <th scope="col">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </th>
          <th scope="col">Stock</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product._id}>
            <td
              scope="row"
              data-label="Producto"
              className={styles.containerName}
            >
              <input
                type="text"
                placeholder={product.name}
                value={editedProducts[product._id]?.name || product.name}
                onChange={(e) =>
                  handleInputChange(product._id, "name", e.target.value)
                }
              />
            </td>
            <td data-label="Precio" className={styles.containerPrice}>
              <span>
                $
                <input
                  type="number"
                  placeholder={product.price}
                  value={editedProducts[product._id]?.price || product.price}
                  onChange={(e) =>
                    handleInputChange(product._id, "price", e.target.value)
                  }
                />
              </span>
            </td>
            <td
              data-label="Descripción"
              className={styles.containerDescription}
            >
              <input
                type="text"
                placeholder={product.description}
                value={
                  editedProducts[product._id]?.description ||
                  product.description
                }
                onChange={(e) =>
                  handleInputChange(product._id, "description", e.target.value)
                }
              />
            </td>
            <td>
              <select
                className={styles.containerCategories}
                value={
                  editedProducts[product._id]?.category || product.category
                }
                onChange={(e) =>
                  handleInputChange(product._id, "category", e.target.value)
                }
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <span>
                <select
                  value={editedProducts[product._id]?.stock || product.stock}
                  onChange={(e) =>
                    handleInputChange(product._id, "stock", e.target.value)
                  }
                >
                  <option value={"Available"}>Disponible</option>
                  <option value={"Unavailable"}>Sin stock</option>
                </select>
              </span>
            </td>
            <td className={styles.containerAction}>
              <span>
                <button
                  className={styles.actionButton}
                  onClick={() => handleDelete(product._id)}
                >
                  <Delete />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => handleSave(product._id)}
                >
                  <Save />
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
      <Toaster position="top-right" />
    </table>
  );
}

export default ProductsTable;
