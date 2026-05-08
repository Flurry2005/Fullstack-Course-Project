import Navlink from "./Components/NavbarComponents/NavLink";
import Logo from "./Components/NavbarComponents/Logo";
import InputField from "./Components/General/InputField";
import AuthButtons from "./Components/NavbarComponents/AuthButtons";
import { useAuth } from "./Context/useAuth";
import { useSocket } from "./Context/useSocket";

function NavBar() {
  const { user } = useAuth();
  const { unreadMessages } = useSocket();

  return (
    <header className="z-50 relative flex flex-wrap justify-between items-center bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 w-full h-fit">
      <nav className="flex flex-wrap items-center gap-6">
        <Logo />
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

      <nav className="flex flex-wrap md: ml-auto justify-center gap-10 py-4 h-full">
        <div className="flex">
          <InputField
            placeholder="Search..."
            additionalClasses=" bg-[#e3dfff] px-4 h-10 !rounded-r-none !rounded-full outline-none border-none focus:border-indigo-500 text-sm"
          />
          <span className="flex justify-center items-center bg-[#e3dfff] px-3 rounded-full rounded-l-none h-full text-gray-600">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <AuthButtons />
      </nav>
    </header>
  );
}

export default NavBar;
