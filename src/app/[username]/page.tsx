"use client";
import CartList from "@/Components/Containers/CartList/CartList";
import CategoryRender from "@/Components/Containers/CategoryRender/CategoryRender";
import { CartShop, UpArrow } from "@/Components/Presentation/Icons/Icons";
import { useUserProfile } from "@/Hooks/useUserProfile";
import { getUserCategories } from "@/Services/Categories";
import {
  addToCart,
  calculateCartTotal,
  decreaseQuantity,
  removeFromCart,
} from "@/Store/Actions/cartActions";
import { ICategoryResponse } from "@/Types/category";
import { MercadoPagoPreferenceResponse } from "@/Types/user";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import { CartItem } from "@/Helpers/cart";
import ModalTable from "@/Components/Presentation/ModalTable/ModalTable";

declare global {
  interface Window {
    Mercadopago: any;
    mpInstance: any;
  }
}

const UserProfile = () => {
  const [categories, setCategories] = useState<ICategoryResponse | null>(null);
  const [preference, setPreference] =
    useState<MercadoPagoPreferenceResponse | null>(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  const cartFromRedux = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const user = useUserProfile(pathname, searchParams.toString());

  useEffect(() => {
    const tableNum = localStorage.getItem("tableNumber");
    if (!tableNum) {
      setShowTableModal(true);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getUserCategories();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (window.Mercadopago) {
      const mp = new window.Mercadopago(
        process.env.NEXT_PUBLIC_SERVER_MERCADO_PAGO_INSTANCE_AUTH,
        {
          locale: "es-AR",
        }
      );
      window.mpInstance = mp;
    }
  }, []);

  useEffect(() => {
    if (preference && preference.body && preference.body.init_point) {
      window.location.href = preference.body.init_point;
    }
  }, [preference]);

  useEffect(() => {
    if (!localStorage.getItem("initialUrl")) {
      localStorage.setItem("initialUrl", window.location.href);
    }
  }, []);

  const getPaymentPreference = async () => {
    const tableNumber = localStorage.getItem("tableNumber");

    const cartDetails = cartFromRedux.map((item: CartItem) => ({
      title: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      _id: item.product._id,
    }));

    const sellerId = (user as any)._id;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PREFERENCE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartDetails: cartDetails,
            sellerId: sellerId,
            tableNumber: tableNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPreference(data);
    } catch (error: any) {
      console.log("Error fetching payment preference:", error);
    }
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const total = calculateCartTotal(cartFromRedux);

  const addToCartAction = (
    product: CartItem["product"],
    quantity: number = 1
  ) => {
    dispatch(addToCart(product, quantity));
  };

  const removeFromCartAction = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const decreaseQuantityAction = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  if (!user) return <div>Not found </div>;

  const tableNumber = localStorage.getItem("tableNumber");

  return (
    <div className={styles.containerProfile}>
      {showTableModal && <ModalTable />}
      <button className={styles.arrowToTop} onClick={scrollToTop}>
        <UpArrow />
      </button>
      <div className={styles.categoryList}>
        <h1>NUESTRO MENÚ</h1>

        <p>TU MESA ES LA N° {tableNumber}</p>
        <button
          className={styles.changeTable}
          onClick={() => setShowTableModal((prev) => !prev)}
        >
          CAMBIAR MESA
        </button>

        <div className={styles.containerCategories}>
          {categories?.map((category: any) => {
            const hasAvailableProducts = user.products.some(
              (product) =>
                product.category === category._id &&
                product.stock === "Available"
            );
            if (hasAvailableProducts) {
              return (
                <button
                  className={styles.categoryNameButton}
                  key={category._id}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  {category.name.toUpperCase()}
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
      {categories?.map((category: any) => {
        const filteredProducts = user.products
          .filter((product) => product.category === category._id)
          .filter((product) => product.stock === "Available");

        if (filteredProducts.length > 0) {
          return (
            <div key={category._id} id={category._id}>
              <CategoryRender
                categoryName={category.name.toUpperCase()}
                products={filteredProducts}
              />
            </div>
          );
        }

        return null;
      })}
      <button onClick={toggleCartVisibility} className={styles.cart}>
        {isCartVisible ? <CartShop /> : <CartShop />}
      </button>{" "}
      <ul
        className={`${styles.bottomModal} ${
          isCartVisible ? styles.visible : ""
        }`}
      >
        <hr className={styles.hrCart} />
        <h2>Carrito </h2>
        <CartList
          cart={cartFromRedux}
          removeFromCart={removeFromCartAction}
          getPaymentPreference={getPaymentPreference}
          total={total}
        />
      </ul>
    </div>
  );
};

export default UserProfile;
