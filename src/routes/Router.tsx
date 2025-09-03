import { BrowserRouter, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { BrokenRouteAvoider } from "./index";
import { SearchPage, InnerPage } from "../pages";
import { ResultList, SingleResult } from "../components/results";
import { SearchProvider } from "../context/search";
import { NavigationProvider } from "../context/navigation/NavigationProvider";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <NavigationProvider>
            <BrokenRouteAvoider>
              <Route path="/search" element={<SearchPage />} />
              {/* Path provisional para poder meter el context en recommendations */}
              <Route path="/books/results" element={<InnerPage />} />
              {/* Estos paths ahora están mal, se quedan así hasta que la page esté organizada */}
              <Route path="/result-list" element={<ResultList />} />
              <Route path="/result" element={<SingleResult />} />
            </BrokenRouteAvoider>
            {children}
          </NavigationProvider>
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};
