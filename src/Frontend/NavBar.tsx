import Navlink from "./Components/NavbarComponents/NavLink";
import Logo from "./Components/NavbarComponents/Logo";
import InputField from "./Components/General/InputField";
import AuthButtons from "./Components/NavbarComponents/AuthButtons";
import { useAuth } from "./Context/useAuth";
import { useSocket } from "./Context/useSocket";
import { Link } from "react-router-dom";

function NavBar() {
  const { user } = useAuth();
  const { unreadMessages } = useSocket();

  return (
    <header className="z-50 relative flex flex-wrap justify-between items-center bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 w-full h-fit">
      {/* Left side */}
      <Logo />




      {/* Middle side */}
      <nav className="flex flex-wrap  gap-6">
        
        <Navlink
          to={"/services"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <Navlink to={`${user ? "/dashboard" : "/"}`} text={`${user ? "Seller Dashboard" : "Become a Seller"}`} />
        {user && (
          <div className="relative flex">
            <Navlink to={"/messages"} text={"Messages"} />
            {unreadMessages > 0 && (
              <span className="top-0 -right-3 absolute flex justify-center items-center bg-red-500 p-0.5 rounded-full w-5 h-5 aspect-square font-bold text-[8px] text-white text-center">
                {unreadMessages > 99 ? "99+" : unreadMessages}
              </span>
            )}
          </div>
        )}
      </nav>

      <nav className="flex flex-wrap  gap-10 py-4">
       {/* Right side */}
       {user ? 
                <div>
            <Link
                to={"/profile/" + user.username }
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold text-black shadow-[0_0_20px_rgba(122,162,255,0.35)] transition hover:scale-105"
                aria-label="Visit profile"
              >
                N
              </Link>
         </div>
         :
         <div>

         </div>
       }

        <AuthButtons/>

       
          
      </nav>
    </header>
  );
}

export default NavBar;
