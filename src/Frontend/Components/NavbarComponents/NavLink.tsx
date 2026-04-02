import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  className?: string;
  active?: boolean;
}

function NavLink({ to, text, active }: Props) {
  return (
    <Link
      to={to}
      className={`text-black text-[1rem] rounded-xs py-1 px-2 text-center ${
        active
          ? "text-indigo-600 border-b-2 border-indigo-600"
          : " text-gray-600 hover:text-black"
      }`}
    >
      {text}
    </Link>
  );
}

export default NavLink;
