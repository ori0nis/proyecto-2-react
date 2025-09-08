import { NavLink } from "react-router-dom";
import { HomeButton } from "./HomeButton";
import { Recommendations } from "./Recommendations";

export const Sidebar = () => {
  return (
    <div className="xs:w-[200px] py-4 px-2 border border-[var(--border-gray-byblos)] rounded-lg">
      <HomeButton />

      {/* Favoritos */}
      <NavLink
        to="/books/results/favorites"
        className={({ isActive }) =>
          `block py-2 px-2 rounded-lg w-fit ${isActive ? "bg-white text-red-500 font-bold" : "text-gray-900 hover:bg-amber-200"}`
        }
      >
        My favorites
      </NavLink>

      {/* Recommendations */}
      <Recommendations />
    </div>
  );
};
