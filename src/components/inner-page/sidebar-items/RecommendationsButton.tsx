import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface Props {
  toggle: () => void;
}

export const RecommendationsButton = ({ toggle }: Props) => {
  return (
    <NavLink
      to="#"
      className="flex flex-col xs:flex-row py-2 px-2.5 cursor-pointer hover:bg-amber-200 hover:rounded-lg"
      onClick={toggle}
    >
      <svg width="40" height="40" aria-hidden="true" className="text-red-500 xs:w-8 xs:h-8">
        <use href="/assets/spritesheet.svg#icon-book"></use>
      </svg>
      <span className="hidden xs:inline text-xs text-center font-semibold">
        Random recommendation
        <ChevronDown size={16} className="hidden xs:block mx-auto" />
      </span>
    </NavLink>
  );
};
