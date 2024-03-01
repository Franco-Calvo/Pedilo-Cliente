import { CartItem } from "../../Helpers/cart";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  SET_CART,
} from "../Actions/cartActions";

const initialState: CartItem[] = [];

const cartReducer = (state = initialState, action: any) => {
  let updatedCart, existingItemIndex;

  switch (action.type) {
    case SET_CART:
      return action.payload;

    case ADD_TO_CART:
      updatedCart = [...state];
      existingItemIndex = updatedCart.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = updatedCart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
        updatedCart[existingItemIndex] = updatedItem;
        if (updatedItem.quantity <= 0) {
          return updatedCart.filter(
            (item) => item.product._id !== action.payload.product._id
          );
        }
      } else if (action.payload.quantity > 0) {
        updatedCart.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }

      return updatedCart;

    case REMOVE_FROM_CART:
      return state.filter((item) => item.product._id !== action.payload);

    case DECREASE_QUANTITY:
      updatedCart = [...state];
      existingItemIndex = updatedCart.findIndex(
        (item) => item.product._id === action.payload
      );
      if (existingItemIndex !== -1) {
        const existingItem = updatedCart[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedCart[existingItemIndex] = updatedItem;
        if (updatedItem.quantity <= 0) {
          return updatedCart.filter(
            (item) => item.product._id !== action.payload
          );
        }
      }
      return updatedCart;

    default:
      return state;
  }
};

export default cartReducer;
