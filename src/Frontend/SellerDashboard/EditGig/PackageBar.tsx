import type { Package } from "../../types/Gig";

type PackageBarProps = {
  plan: Package;
  name: string;
};

function PackageBar({ plan, name }: PackageBarProps) {
  return (
    <div className="flex px-3 rounded-xl py-3 hover:bg-[#EEF2FF]  bg-[#F8FAFC] border border-[#F1F5F9]">
      <span className="text-xl text-[#131B2E]">{name}</span>
      <span className="ml-auto font-bold text-xl text-[#3525CD]">${plan.price}</span>

    </div>
  );
}

export default PackageBar;
