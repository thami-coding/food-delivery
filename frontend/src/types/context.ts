import type { TCart } from "./cart";
import type { TUser } from "./user";

export type GlobalState = {
  user: TUser;
  cart: TCart[] ;
  isDialogOpen: boolean;
};

export type Action =
  | { type: "ADD_TO_CART"; payload: TCart }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "SET_CART"; payload: TCart[]}
  | { type: "CLEAR_CART" }
  | { type: "LOGIN"; payload: TUser }
  | { type: "LOGOUT" }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "TOGGLE_DIALOG" }
  | { type: "SET_USER"; payload: TUser };

export interface GlobalStateContext {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}
