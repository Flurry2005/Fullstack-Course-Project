import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import MiniButton from "../HomePageComponents/MiniButtonLink";

function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <NavLink to="/login" text="Login" />

      <MiniButton to={"/register"} text={"Join"} />
    </div>
  );
}

export default AuthButtons;
