import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";



function Logo() {
  return <Link to={"/"} className="font-bold text-2xl! text-indigo-500!">OurStore</Link>;
}

export default Logo;
