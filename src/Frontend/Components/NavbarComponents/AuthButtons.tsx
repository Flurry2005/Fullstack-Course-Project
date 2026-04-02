import { Link } from "react-router-dom";
import NavLink from "./NavLink";

function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <NavLink to="/login" text="Login" />

      <Link to="/register">
        <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full font-medium text-white text-sm transition cursor-pointer">
          Join
        </button>
      </Link>
    </div>
  );
}

export default AuthButtons;
