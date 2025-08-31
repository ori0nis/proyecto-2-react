import { BrowserRouter, Route } from "react-router-dom";
import { BrokenRouteAvoider } from "./index";
import { SearchPage } from "../pages/SearchPage";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <BrokenRouteAvoider>
          <Route path="/search" element={<SearchPage />} />
        </BrokenRouteAvoider>
        {children}
      </BrowserRouter>
    </>
  );
};
