import { useReducer, type ReactNode } from "react";
import type { Action, GlobalState } from "../types/context";
import { GlobalContext } from "./GlobalStateContext";

const initialState: GlobalState = {
  user: null,
  cart: [],
  isDialogOpen: false,
};

function globalReducer(state: GlobalState, action: Action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "TOGGLE_DIALOG":
      return { ...state, isDialogOpen: !state.isDialogOpen };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
}

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
