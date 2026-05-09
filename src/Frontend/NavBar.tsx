import Navlink from "./Components/NavbarComponents/NavLink";
import Logo from "./Components/NavbarComponents/Logo";
import InputField from "./Components/General/InputField";
import AuthButtons from "./Components/NavbarComponents/AuthButtons";
import { useAuth } from "./Context/useAuth";
import { useSocket } from "./Context/useSocket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar() {
  const { user } = useAuth();
  const { unreadMessages } = useSocket();
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen((prev) => {
      document.body.classList.toggle("overflow-hidden", !prev);
      return !prev;
    });
  };
  useEffect(() => {
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <header className="z-50 relative flex flex-wrap justify-between items-center bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 w-full md:h-fit min-h-17">
      {/* Left side */}
      <Logo />
      {/* Middle side */}
      <nav className="hidden md:flex flex-wrap gap-6">
        <Navlink
          to={"/services"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <Navlink
          to={`${user ? "/dashboard" : "/"}`}
          text={`${user ? "Seller Dashboard" : "Become a Seller"}`}
        />
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
      <nav className="hidden md:flex flex-wrap gap-10 py-4">
        {/* Right side */}
        {user ? (
          <div>
            <Link
              to={"/profile/" + user.username}
              type="button"
              className="flex justify-center items-center shadow-[0_0_20px_rgba(122,162,255,0.35)] border rounded-full w-9 h-9 font-bold text-black text-sm hover:scale-105 transition"
              aria-label="Visit profile"
            >
              N
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <AuthButtons />
      </nav>

      {/*THe burger Menu */}
      <div
        className="md:hidden right-8 absolute flex flex-col justify-center space-y-1.5 cursor-pointer"
        onClick={toggleNav}
      >
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${
            navOpen ? "rotate-45 translate-y-2.25" : ""
          }`}
        ></span>
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${
            navOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${
            navOpen ? "-rotate-45 -translate-y-2.25" : ""
          }`}
        ></span>
      </div>

      {/*Sidebar*/}
      <nav
        className={`top-16 right-0 fixed flex flex-col items-center bg-white w-[50%] h-full z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out md:hidden ${navOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex justify-center items-center gap-10 py-4">
          {/* Right side */}
          {user ? (
            <div className="flex justify-center">
              <Link
                to={"/profile/" + user.username}
                type="button"
                className="flex justify-center items-center shadow-[0_0_20px_rgba(122,162,255,0.35)] border-2 rounded-full w-15 h-15 font-bold text-black text-2xl hover:scale-105 transition"
                aria-label="Visit profile"
              >
                N
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          <div className="bottom-20 absolute">
            <AuthButtons additionalClasses="px-5 py-3 text-xl" />
          </div>
        </nav>
        <div className="flex flex-col items-center gap-4 mt-6">
          <Navlink
            to={"/services"}
            text={"Browse Categories"}
            className={"text-[1.5rem]"}
          />
          <Navlink
            to={`${user ? "/dashboard" : "/"}`}
            text={`${user ? "Seller Dashboard" : "Become a Seller"}`}
          />
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
        </div>
      </nav>
      <div
        className={`md:hidden z-40 top-16 left-0 bg-black/50 backdrop-blur-xs w-full h-full fixed transition-opacity duration-300 ${navOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleNav}
      ></div>
    </header>
  );
}

export default NavBar;
