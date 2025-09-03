import { NavigationContext } from "./NavigationContext";
import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: Props) => {
  const [allowAccess, setAllowAccess] = useState(false);

  return <NavigationContext.Provider value={{ allowAccess, setAllowAccess }}>{children}</NavigationContext.Provider>;
};
