function Section2Header() {
  return (
    <div className="flex justify-between items-start gap-6">
      <div>
        <h2 className="font-bold text-[#23235b] text-[44px] leading-tight">
          Browse by Craft
        </h2>
        <p className="mt-3 text-[#6f6f9a] text-[20px]">
          Explore specialized services from certified professionals.
        </p>
      </div>

      <button className="inline-flex items-center gap-2 hover:opacity-80 mt-4 font-semibold text-[#1857f7] text-[22px] cursor-pointer">
        View All
        <span className="text-2xl">→</span>
      </button>
    </div>
  );
}

export default Section2Header;
