import BrowseByCategoryHeader from "./BrowseByCategoryHeader";
import BrowseByCategoryGrid from "./BrowseByCategoryGrid";

function BrowseByCategorySection() {
  return (
    <section className="bg-[#f2ecfc] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-10 md:py-12 w-full">
      <div className="mx-auto container">
        <BrowseByCategoryHeader />
        <BrowseByCategoryGrid />
      </div>
    </section>
  );
}

export default BrowseByCategorySection;
