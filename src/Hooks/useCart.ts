import { useEffect, useState } from "react";
import {
  CartItem,
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../Helpers/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  const addToCart = (product: CartItem["product"], quantity: number = 1) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (item) => item.product._id === product._id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      if (existingItem.quantity <= 0) {
        return removeFromCart(product._id);
      }
    } else if (quantity > 0) {
      updatedCart.push({ product, quantity });
    }

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const decreaseQuantity = (productId: string) => {
    const product = cart.find(
      (item) => item.product._id === productId
    )?.product;
    if (product) {
      addToCart(product, -1);
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (accum, item) => accum + item.product.price * item.quantity,
      0
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    calculateTotal,
  };
};
