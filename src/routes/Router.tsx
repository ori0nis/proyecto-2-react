import { BrowserRouter, Route } from "react-router-dom";
import type { ReactNode } from "react";
import { BrokenRouteAvoider, PrivateGuard } from "./routes-utils";
import { SearchProvider } from "../context/search";
import { NavigationProvider } from "../context/navigation";
import { FavoriteProvider } from "../context/favorites";
import { PrivateRouter } from "./PrivateRouter";
import { SearchLayout } from "../pages/layouts";

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <NavigationProvider>
            <FavoriteProvider>
              <BrokenRouteAvoider>
                {/* Ruta pública */}
                <Route path="/search" element={<SearchLayout />} />
                {/* Rutas internas (solo accesibles por navegación) */}
                <Route element={<PrivateGuard />}>
                  <Route path="/books/*" element={<PrivateRouter />} />
                </Route>
              </BrokenRouteAvoider>
              {children}
            </FavoriteProvider>
          </NavigationProvider>
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};
