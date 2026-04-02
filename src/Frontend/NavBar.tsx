import Navlink from "./Components/NavbarComponents/NavLink";
import Logo from "./Components/NavbarComponents/Logo";
import InputField from "./Components/General/InputField";
import AuthButtons from "./Components/NavbarComponents/AuthButtons";

function NavBar() {
  return (
    <header className="z-50 relative flex justify-between items-center bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] px-6 w-full h-18">
      <nav className="flex items-center gap-6">
        <Logo />
        <Navlink
          to={"/"}
          text={"Browse Categories"}
          className={"text-[1.5rem]"}
        />
        <Navlink to={"/"} text={"Become a Seller"} />
      </nav>

      <nav className="flex justify-center gap-10 py-4 h-full">
        <div className="flex">
          <InputField
            placeholder="Search..."
            additionalClasses=" bg-[#e3dfff] px-4 h-full !rounded-r-none !rounded-full outline-none border-none focus:border-indigo-500 text-sm"
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
