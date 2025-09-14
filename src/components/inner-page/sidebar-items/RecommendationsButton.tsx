import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
interface Props {
  toggle: () => void;
}
export const RecommendationsButton = ({ toggle }: Props) => {
  return (
    <NavLink
      to="#"
      className="flex flex-col items-center xs:flex-row py-2 px-2.5 xs:mb-1 cursor-pointer hover:bg-amber-200 hover:rounded-lg"
      onClick={toggle}
    >
      <div className="flex items-center gap-2">
        <svg width="40" height="40" aria-hidden="true" className="text-red-500 xs:w- xs:h-9">
          <use href="/assets/spritesheet.svg#icon-book"></use>
        </svg>
        <span className="hidden xs:inline xs:text-md text-center font-semibold">
          Discover new books
        </span>
      </div>

      <ChevronDown size={24} className="hidden xs:block mx-auto " />
    </NavLink>
  );
};
