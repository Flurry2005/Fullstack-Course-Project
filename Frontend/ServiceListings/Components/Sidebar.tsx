import { useState } from "react";

const ratings = [5, 4, 3, 2, 1];
const visibleCategoryCount = 5;

type SidebarProps = {
  categories: string[];
  deliveryTimes: string[];
  selectedCategories: string[];
  minPrice: string;
  maxPrice: string;
  selectedRating: number;
  selectedDeliveryTime: string;
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onRatingChange: (rating: number) => void;
  onDeliveryTimeChange: (time: string) => void;
  onClearFilters: () => void;
};

function Sidebar({
  categories,
  deliveryTimes,
  selectedCategories,
  minPrice,
  maxPrice,
  selectedRating,
  selectedDeliveryTime,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onRatingChange,
  onDeliveryTimeChange,
  onClearFilters,
}: SidebarProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [areCategoriesExpanded, setAreCategoriesExpanded] = useState(false);

  const visibleCategories = areCategoriesExpanded
    ? categories
    : categories.slice(0, visibleCategoryCount);
  const activeFilterCount =
    selectedCategories.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    (selectedDeliveryTime ? 1 : 0);

  return (
    <aside className="bg-[#f0eafa] p-4 sm:p-5 lg:p-6 rounded-2xl w-full lg:w-80 text-[#5a5781]">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsMobileFiltersOpen((current) => !current)}
          className="flex lg:hidden items-center gap-3 text-[#2c2a51] text-lg cursor-pointer"
          aria-expanded={isMobileFiltersOpen}
        >
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-white px-2 py-0.5 rounded-full font-semibold text-[#1857f7] text-xs">
              {activeFilterCount}
            </span>
          )}
          <i
            className={`fa-solid fa-chevron-down text-sm transition ${
              isMobileFiltersOpen ? "rotate-180" : ""
            }`}
          ></i>
        </button>

        <h2 className="hidden lg:block text-[#2c2a51] text-xl">Filters</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearFilters}
            className="font-semibold text-[#1857f7] text-sm cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      <div className={`${isMobileFiltersOpen ? "block" : "hidden"} lg:block`}>
        <section>
          <h3 className="mt-6 lg:mt-8 mb-4 text-[#2c2a51] text-base lg:text-lg">
            Service Category
          </h3>
          <div className="flex flex-col gap-3">
            {visibleCategories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="sr-only"
                />
                <span
                  className={`flex items-center justify-center border rounded-sm w-5 h-5 text-xs shrink-0 ${
                    selectedCategories.includes(category)
                      ? "bg-[#1857f7] border-[#1857f7] text-white"
                      : "border-[#b8b1df] bg-white"
                  }`}
                >
                  {selectedCategories.includes(category) && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </span>
                <span className="text-sm lg:text-base leading-snug">
                  {category}
                </span>
              </label>
            ))}
          </div>

          {categories.length > visibleCategoryCount && (
            <button
              type="button"
              onClick={() =>
                setAreCategoriesExpanded((currentExpanded) => !currentExpanded)
              }
              className="flex items-center gap-2 mt-4 font-semibold text-[#1857f7] text-sm cursor-pointer"
            >
              <span>
                {areCategoriesExpanded ? "Show fewer" : "Show all categories"}
              </span>
              <i
                className={`fa-solid fa-chevron-down text-xs transition ${
                  areCategoriesExpanded ? "rotate-180" : ""
                }`}
              ></i>
            </button>
          )}
        </section>

        <section className="mt-8 lg:mt-10">
          <h3 className="mb-4 lg:mb-5 text-[#2c2a51] text-base lg:text-lg">
            Price Range
          </h3>
          <div className="gap-3 grid grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-[#6f6f9a] text-xs uppercase">Min</span>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="$0"
                className="bg-[#ded7fb] px-4 py-3 rounded-lg w-full outline-none text-[#5a5781] placeholder:text-[#7a759d]"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[#6f6f9a] text-xs uppercase">Max</span>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="$1000"
                className="bg-[#ded7fb] px-4 py-3 rounded-lg w-full outline-none text-[#5a5781] placeholder:text-[#7a759d]"
              />
            </label>
          </div>
        </section>

        <section className="mt-8 lg:mt-10">
          <h3 className="mb-4 text-[#2c2a51] text-base lg:text-lg">
            Seller Rating
          </h3>
          <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-3">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => onRatingChange(rating)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left cursor-pointer ${
                  selectedRating === rating
                    ? "bg-white text-[#1857f7]"
                    : "hover:bg-white/60"
                }`}
              >
                <span className="flex gap-1 text-[#f7b500]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <i
                      key={index}
                      className={`fa-star text-sm ${
                        index < rating ? "fa-solid" : "fa-regular"
                      }`}
                    ></i>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 lg:mt-10">
          <h3 className="mb-4 text-[#2c2a51] text-base lg:text-lg">
            Delivery Time
          </h3>
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {deliveryTimes.map((time) => (
              <button
                key={time}
                onClick={() => onDeliveryTimeChange(time)}
                className={`px-4 lg:px-5 py-2 rounded-full font-semibold text-sm cursor-pointer ${
                  selectedDeliveryTime === time
                    ? "bg-[#1857f7] text-white"
                    : "bg-[#ded7fb] text-[#5f5a84]"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

export default Sidebar;
