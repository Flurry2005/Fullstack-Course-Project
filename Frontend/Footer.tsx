function Footer() {
  return (
    <header className="z-50 relative flex justify-between items-center bg-white shadow-[0px_-1px_3px_0px_rgba(0,0,0,0.1)] px-6 w-full h-28">
      <p className="text-gray-600">
        © 2026 ProjetName. Crafted for excellence.
      </p>
      <div className="flex gap-8 text-2xl cursor-pointer">
        <i className="fa-solid fa-globe"></i>
        <i className="fa-solid fa-share-nodes"></i>
        <i className="fa-regular fa-id-card"></i>
      </div>
    </header>
  );
}

export default Footer;
