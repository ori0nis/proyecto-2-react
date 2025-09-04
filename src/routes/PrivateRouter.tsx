import { Route } from "react-router-dom";
import { ByblosLayout } from "../pages/layouts/ByblosLayout";
import { BrokenRouteAvoider } from "./routes-utils";
import { BookDetailsPage, FavoritesPage, ResultListPage, SingleResultPage } from "../pages/pages";

export const PrivateRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path="results/" element={<ByblosLayout />}>
        <Route path="result-list" element={<ResultListPage />} />
        <Route path="book" element={<SingleResultPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="book-detail" element={<BookDetailsPage />} />
      </Route>
    </BrokenRouteAvoider>
  );
};
