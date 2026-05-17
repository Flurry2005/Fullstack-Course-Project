import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Section2Header() {
  const navigate = useNavigate();
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-6">
      <div>
        <h2 className="font-bold text-[#23235b] lg:text-[44px] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Browse by Craft
        </h2>

        <p className="mt-3 text-[#6f6f9a] lg:text-[20px] text-sm sm:text-base md:text-lg">
          Explore specialized services from certified professionals.
        </p>
      </div>

      <button
        className="inline-flex items-center self-start sm:self-auto gap-2 hover:opacity-80 font-semibold text-[#1857f7] lg:text-[22px] text-base sm:text-lg cursor-pointer"
        onClick={() => {
          navigate(`${"/services"}`);
        }}
      >
        View All
        <ChevronRight />
      </button>
    </div>
  );
}

export default Section2Header;
