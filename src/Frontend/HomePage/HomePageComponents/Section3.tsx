import ServiceCard from "./ServiceCard";

function Section2() {
  return (
    <section className="flex justify-between items-start gap-6 bg-[#f9f5ff] px-10 pb-10">
      <div>
        <h2 className="my-5 font-semibold text-[#23235b] text-[44px] leading-tight">
          Popular Services
        </h2>

        <div className="gap-6 grid grid-cols-1 grid-cols-2 lg:grid-cols-4 sm:">
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
