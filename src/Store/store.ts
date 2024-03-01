import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reducer/cartReducer";

const isBrowser = typeof window !== "undefined";

const saveToLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (isBrowser) {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  }
  return result;
};

const getInitialCartState = () => {
  if (isBrowser) {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  return [];
};

const preloadedState = {
  cart: getInitialCartState(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
  preloadedState: preloadedState,
});

export default store;
