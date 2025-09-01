import { BrowserRouter, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { BrokenRouteAvoider } from "./index";
import { SearchPage } from "../pages/SearchPage";
import { ResultList, SingleResult } from "../components/results";
import { SearchProvider } from "../context/search";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <BrokenRouteAvoider>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/result-list" element={<ResultList />} />
            <Route path="/result" element={<SingleResult />} />
          </BrokenRouteAvoider>
          {children}
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};
