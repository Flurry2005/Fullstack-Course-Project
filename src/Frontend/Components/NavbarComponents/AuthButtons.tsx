import NavLink from "./NavLink";
import MiniButton from "../HomePageComponents/MiniButtonLink";
import { useAuth } from "../../Context/useAuth";

function AuthButtons() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <button
            onClick={() => {
              logout();
            }}
            className="bg-red-400 px-3 py-1.5 rounded-2xl font-semibold text-white cursor-pointer"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" text="Login" />
          <MiniButton to={"/register"} text={"Join"} />
        </>
      )}
    </div>
  );
}

export default AuthButtons;
