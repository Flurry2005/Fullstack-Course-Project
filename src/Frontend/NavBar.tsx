import React from "react";
import Navlink from "./NavLink";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

function NavBar() {
  return (
    <header className="flex justify-between items-center bg-white px-6 border-black/15 border-b w-full h-14">
      <nav className="flex items-center gap-6">
        <Logo />
        <Navlink
          to={"/"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <Navlink to={"/"} text={"Become a Seller"} />
      </nav>

      <SearchBar />
      <nav>
        <Navlink to={"/"} text={"Login"} />
        <Navlink to={"/"} text={"Join"} />
      </nav>
    </header>
  );
}

export default NavBar;
