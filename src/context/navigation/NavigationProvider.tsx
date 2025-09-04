import { NavigationContext } from "./NavigationContext";
import { useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: Props) => {
  const [allowAccess, setAllowAccess] = useState(false);
  const [clickFromResultList, setClickFromResultList] = useState(false);
  const [clickFromFavorites, setClickFromFavorites] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        allowAccess,
        setAllowAccess,
        clickFromResultList,
        setClickFromResultList,
        clickFromFavorites,
        setClickFromFavorites,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
