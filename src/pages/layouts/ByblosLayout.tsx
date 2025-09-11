import { Outlet } from "react-router-dom";
import { InnerAdvancedSearchForm, InnerSearchBar, Sidebar } from "../../components/inner-page";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ByblosLayout = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);

  const toggleAdvancedSearch = () => setShowAdvancedSearch((prev) => !prev);

  return (
    <div className="grid sm:grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] h-screen bg-[var(--background-color-byblos)]">
      {/* Search bars internas */}
      <div className="hidden xs:flex col-span-2 flex-col items-center justify-center text-center w-full p-2">
        {/* Contenedor que pasa a grid cuando se muestra advanced */}
        <div
          className={`w-fit grid gap-6 transition-all duration-500 ${
            showAdvancedSearch ? "grid-cols-[1fr_auto] items-center" : "grid-cols-1"
          }`}
        >
          {/* Columna izquierda: InnerSearch */}
          <div className="flex flex-col">
            <InnerSearchBar />

            {/* Toggle */}
            <div className="pt-4 text-sm text-center">
              {showAdvancedSearch ? (
                <>
                  <p>Hide advanced search</p>
                  <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
                    <ChevronLeft size={16} />
                  </button>
                </>
              ) : (
                <>
                  <p>Show advanced search</p>
                  <button className="cursor-pointer" onClick={toggleAdvancedSearch}>
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Columna derecha: InnerAdvancedSearch */}
          {showAdvancedSearch && (
            <div className="animate-[slideInLeftToRight_0.5s_ease-in-out_0.1s_both]">
              <InnerAdvancedSearchForm />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Outlet */}
      <div className="overflow-y-auto p-2">
        <hr className="xs:block hidden border-t border-gray-400 pb-3" />
        <Outlet />
      </div>
    </div>
  );
};
