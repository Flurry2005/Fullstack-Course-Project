function SearchBar() {
  return (
    <div className="relative w-75">
      <input
        type="text"
        placeholder="Search services..."
        className="bg-gray-100 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 w-full text-sm"
      />

      <span className="top-1/2 right-3 absolute text-gray-500 -translate-y-1/2">
        🔍
      </span>
    </div>
  );
}

export default SearchBar;
