import { CartItem } from "../../Helpers/cart";

export const SET_CART = "SET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

export const setCart = (cart: CartItem[]) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (
  product: CartItem["product"],
  quantity: number = 1
) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const removeFromCart = (productId: string) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const decreaseQuantity = (productId: string) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
};
