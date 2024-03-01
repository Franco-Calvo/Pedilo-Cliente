const CART_KEY = "user_cart";

export type CartItem = {
  product: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
  };
  quantity: number;
};

export function getCartFromLocalStorage(): CartItem[] {
  const cartString = localStorage.getItem(CART_KEY);
  return cartString ? JSON.parse(cartString) : [];
}

export function saveCartToLocalStorage(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
