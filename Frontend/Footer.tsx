import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="z-50 flex justify-between items-center mx-auto px-6 w-full h-28 container">
      <p className="text-gray-600 max-sm:text-xs">© 2026 ProjetName.</p>
      <div className="flex md:gap-8 gap-3 text-2xl cursor-pointer">
        <p
          onClick={() => {
            navigate("/about");
          }}
          className="font-semibold max-sm:text-base text-xl"
        >
          About
        </p>
        <i className="fa-solid fa-globe"></i>
        <i className="fa-solid fa-share-nodes"></i>
        <i className="fa-regular fa-id-card"></i>
      </div>
    </footer>
  );
}

export default Footer;
