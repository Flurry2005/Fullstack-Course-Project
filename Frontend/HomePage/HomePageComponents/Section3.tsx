import ServiceCard from "./ServiceCard";

function Section2() {
  return (
    <section className="bg-[#f9f5ff] px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="my-5 font-semibold text-[#23235b] lg:text-[44px] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Popular Services
        </h2>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ServiceCard
            image={"/HomePage/goon.jpg"}
            rating={"5"}
            name={"Placeholder"}
            description={"LOREM IPSUM DOLOR LIGMA BLYAT"}
            price={"$67.69"}
          />
        </div>
      </div>
    </section>
  );
}

export default Section2;
