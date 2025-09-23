import { useContext } from "react";
import { GlobalContext } from "../context/GlobalStateContext";

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  return context;
};
