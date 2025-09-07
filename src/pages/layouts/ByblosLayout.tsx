import { Outlet, useNavigate } from "react-router-dom";
import { HomeButton, InnerAdvancedSearchForm, InnerSearchBar, Recommendations } from "../../components/inner-page";
import { useState } from "react";

export const ByblosLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
      {/* Header - ocupa todo el ancho */}
      <div className="col-span-2 flex flex-col items-center justify-center text-center bg-blue-300 w-full p-4">
        <InnerSearchBar />
        <button onClick={toggleAdvancedSearch} className="mt-2">
          {showAdvancedSearch ? "Hide advanced search" : "Show advanced search"}
        </button>
        {showAdvancedSearch && (
          <div className="mt-2 w-full max-w-xl">
            <InnerAdvancedSearchForm />
          </div>
        )}
      </div>

      {/* Sidebar + Main content */}
      <div className="bg-red-500 p-4 w-[250px]">
        <HomeButton />
        <button onClick={() => navigate("/books/results/favorites")}>
          My favorites
        </button>
        <Recommendations />
      </div>

      <div className="overflow-y-auto p-4 bg-green-600">
        <Outlet />
      </div>
    </div>
  );
};
