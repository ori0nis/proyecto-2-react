import { Outlet } from "react-router-dom";
import { InnerAdvancedSearchForm, InnerSearchBar, Sidebar } from "../../components/inner-page";
import { useState } from "react";

export const ByblosLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="grid sm:grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] h-screen bg-[var(--background-color-byblos)]">
      {/* Header */}
      <div className="hidden xs:block col-span-2 flex flex-col items-center justify-center text-center bg-blue-300 w-full p-4">
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

      {/* Sidebar */}
      <Sidebar />

      {/* Outlet */}
      <div className="overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
