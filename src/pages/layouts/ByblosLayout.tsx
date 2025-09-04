import { Outlet, useNavigate } from "react-router-dom";
import { HomeButton, InnerAdvancedSearchForm, InnerSearchBar, Recommendations } from "../../components/inner-page";
import { useState } from "react";

export const ByblosLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <>
      <InnerSearchBar />

      <button onClick={toggleAdvancedSearch}>
        {showAdvancedSearch ? "Hide advanced search" : "Show advanced search"}
      </button>

      {showAdvancedSearch && <InnerAdvancedSearchForm />}

      <HomeButton />
      <button onClick={() => navigate("/books/results/favorites")}>My favorites</button>
      <Recommendations />

      <Outlet />
    </>
  );
};
