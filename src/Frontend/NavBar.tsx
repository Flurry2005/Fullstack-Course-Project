import React from "react";
import Navlink from "./Components/NavbarComponents/NavLink";
import Logo from "./Logo";
import InputField from "./Components/General/InputField";
import AuthButtons from "./Components/NavbarComponents/AuthButtons";

function NavBar() {
  return (
    <header className="flex justify-between items-center bg-white shadow-[0px_1px_3px_0px_rgba(0,_0,_0,_0.1)] px-6 w-full h-14">
      <nav className="flex items-center gap-6">
        <Logo />
        <Navlink
          to={"/"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <Navlink to={"/"} text={"Become a Seller"} />
      </nav>

      <nav className="flex">
        <InputField
          placeholder="Search..."
          additionalClasses=" bg-gray-100 px-4 py-2 rounded-full outline-none border-1 focus:border-indigo-500 text-sm"
        />
        <AuthButtons />
      </nav>
    </header>
  );
}

export default NavBar;
