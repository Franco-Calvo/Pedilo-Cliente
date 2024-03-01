import { Trash } from "@/Components/Presentation/Icons/Icons";
import LoaderCommon from "@/Components/Presentation/Loader/LoaderCommon";
import { useState } from "react";
import styles from "./CartList.module.css";

const CartList = ({
  cart,
  removeFromCart,
  total,
  getPaymentPreference,
}: any) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    await getPaymentPreference();
  };

  const formatPrice = (price: any) => {
    const hasCents = price % 1 !== 0;

    return (hasCents ? price.toFixed(2) : price.toString())
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      {cart.map((cartItem: any) => (
        <li key={cartItem.product._id} className={styles.cartCard}>
          {cartItem.product.name} $
          {formatPrice(cartItem.product.price * cartItem.quantity)}
          <span className={styles.containerButtons}>
            {cartItem.quantity}
            <button
              className={styles.addToCart}
              onClick={() => removeFromCart(cartItem.product._id)}
            >
              <Trash />
            </button>
          </span>
        </li>
      ))}
      <span className={styles.totalAmount}>
        Total a pagar: ${formatPrice(total)}
      </span>
      <button onClick={handlePayment} className={styles.payCart}>
        {loading ? <LoaderCommon /> : "Finalizar compra"}
      </button>
    </>
  );
};

export default CartList;
