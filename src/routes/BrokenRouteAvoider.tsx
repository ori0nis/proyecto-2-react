import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from "../pages/SearchPage";
import { NotFound } from "./NotFound";

interface Props {
  children: ReactNode;
}

export const BrokenRouteAvoider = ({ children }: Props) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="*" element={<SearchPage />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
};
