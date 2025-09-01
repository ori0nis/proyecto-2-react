import { BrowserRouter, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { BrokenRouteAvoider } from "./index";
import { SearchPage } from "../pages/SearchPage";
import { ResultList } from "../components/results";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <BrokenRouteAvoider>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/result-list" element={<ResultList/>}
        </BrokenRouteAvoider>
        {children}
      </BrowserRouter>
    </>
  );
};
