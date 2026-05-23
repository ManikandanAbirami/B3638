import { createContext, useContext } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}
