import { useAuth } from "../Context/useAuth";
import { useSocket } from "../Context/useSocket";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AuthButtons from "./NavbarComponents/AuthButtons";
import Logo from "./NavbarComponents/Logo";
import NavigationLink from "./NavbarComponents/NavigationLink";
import { LogOut, ShoppingBag, User } from "lucide-react";

function NavBar() {
  const { user, logout } = useAuth();
  const { unreadMessages } = useSocket();
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setNavOpen((prev) => {
      document.body.classList.toggle("overflow-hidden", !prev);
      return !prev;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="z-50 relative flex flex-wrap justify-between items-center bg-white shadow-lg/4 px-6 w-full md:h-fit min-h-17">
      {/* Left side */}
      <Logo />
      {/* Middle side */}
      <nav className="hidden md:flex flex-wrap gap-6">
        <NavigationLink
          to={"/services"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <NavigationLink
          to={`${user ? "/dashboard" : "/"}`}
          text={`${user ? "Dashboard" : "Become a Seller"}`}
        />
        {user && (
          <div className="relative flex">
            <NavigationLink to={"/messages"} text={"Messages"} />
            {unreadMessages > 0 && (
              <span className="top-0 -right-3 absolute flex justify-center items-center bg-red-500 p-0.5 rounded-full w-5 h-5 aspect-square font-bold text-[8px] text-white text-center">
                {unreadMessages > 99 ? "99+" : unreadMessages}
              </span>
            )}
          </div>
        )}
      </nav>

      {/* Right side */}
      <nav className="hidden md:flex flex-wrap items-center gap-10">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              aria-label="Open profile menu"
              className="flex"
            >
              <div
                className={`flex justify-center items-center border-2 bg-gray-500/20 border-gray-500/20 rounded-full font-bold text-white hover:scale-105 transition overflow-hidden cursor-pointer w-11 h-11`}
              >
                {user?.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={user.username}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  user?.username.charAt(0)
                )}
              </div>
            </button>

            {/* Dropdown */}
            <div
              className={`top-14 -right-4 z-50 absolute flex flex-col bg-white shadow-xl py-1 border border-gray-100 rounded-b-xl w-44 overflow-hidden transition-all duration-150 origin-top-right border-t-0 ${
                dropdownOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-y-75 pointer-events-none"
              }`}
            >
              <Link
                to={"/profile/" + user.username}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 hover:bg-[#f4f0fb] px-4 py-2.5 text-[#2C2A51] text-sm transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                to={"/orders"}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 hover:bg-[#f4f0fb] px-4 py-2.5 text-[#2C2A51] text-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                My Orders
              </Link>
              <div className="bg-gray-100 mx-2 h-px" />
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 hover:bg-red-50 px-4 py-2.5 w-full text-red-500 text-sm text-left transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <AuthButtons />
        )}
      </nav>

      {/* Burger Menu */}
      <div
        className="md:hidden right-8 z-500 absolute flex flex-col justify-center space-y-1.5 cursor-pointer"
        onClick={toggleNav}
      >
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${navOpen ? "rotate-45 translate-y-2.25" : ""}`}
        />
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${navOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-9 h-0.75 bg-black transition-all duration-300 ${navOpen ? "-rotate-45 -translate-y-2.25" : ""}`}
        />
      </div>

      {/* Sidebar */}
      <nav
        className={`top-16 right-0 fixed flex flex-col items-center bg-white w-[50%] h-full z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out md:hidden ${navOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex justify-center items-center gap-10 py-4">
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <Link
                to={"/profile/" + user.username}
                onClick={toggleNav}
                className="flex justify-center items-center shadow-[0_0_20px_rgba(122,162,255,0.35)] border-2 rounded-full w-15 h-15 overflow-hidden font-bold text-black text-2xl hover:scale-105 transition"
                aria-label="Visit profile"
              >
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt={user.username}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  user.username.charAt(0)
                )}
              </Link>
            </div>
          ) : (
            <div></div>
          )}
          <div className="bottom-20 absolute">
            {user ? (
              <button
                onClick={() => {
                  toggleNav();
                  logout();
                }}
                className="flex items-center gap-2 px-5 py-3 text-red-500 text-xl"
              >
                Logout
              </button>
            ) : (
              <AuthButtons additionalClasses="px-5 py-3 text-xl" />
            )}
          </div>
        </nav>
        <div className="flex flex-col items-center gap-4 mt-6">
          <NavigationLink
            to={"/services"}
            text={"Browse Categories"}
            className={"text-[1.5rem]"}
          />
          <NavigationLink
            to={`${user ? "/dashboard" : "/"}`}
            text={`${user ? "Dashboard" : "Become a Seller"}`}
          />
          {user && (
            <div className="relative flex">
              <NavigationLink to={"/messages"} text={"Messages"} />
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
      />
    </header>
  );
}

export default NavBar;
