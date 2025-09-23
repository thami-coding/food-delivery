import { createContext } from "react";
import type { GlobalStateContext } from "../types/context";


export const GlobalContext = createContext<GlobalStateContext | undefined>(undefined);