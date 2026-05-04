type ListingsHeaderProps = {
  searchQuery: string;
  sortBy: string;
  resultsCount: number;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

const sortOptions = ["Most Relevant", "Price Low to High", "Price High to Low"];

function ListingsHeader({
  searchQuery,
  sortBy,
  resultsCount,
  onSearchChange,
  onSortChange,
}: ListingsHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex w-full max-w-3xl">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search services..."
            className="bg-[#e3dfff] px-5 py-4 rounded-l-full w-full outline-none text-[#2c2a51] placeholder:text-[#7a759d]"
          />
          <button className="flex items-center justify-center bg-[#e3dfff] px-5 rounded-r-full text-[#5a5781] cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <label className="flex items-center gap-3 bg-[#efe9ff] px-5 py-3 rounded-full w-full xl:w-auto font-semibold text-[#5a5781] text-sm">
          <span className="shrink-0">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent outline-none font-semibold text-[#1857f7] cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="font-medium text-[#6f6f9a] text-sm">
        Showing {resultsCount} services
      </p>
    </div>
  );
}

export default ListingsHeader;
