import { NavLink } from "react-router-dom";

export const HomeButton = () => {
  return (
    <NavLink
      to="/search"
      className={({ isActive }) =>
        `block py-2 px-2 rounded-lg w-fit ${
          isActive ? "bg-white text-red-500 font-bold" : "text-gray-900 hover:bg-amber-200"
        }`
      }
    >
      Home page
    </NavLink>
  );
};