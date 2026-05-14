import Section2Header from "./Section2Header";
import Section2Grid from "./Section2Grid";

function Section2() {
  return (
    <section className="bg-[#f2ecfc] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-10 md:py-12 w-full">
      <div className="mx-auto w-full max-w-7xl">
        <Section2Header />
        <Section2Grid />
      </div>
    </section>
  );
}

export default Section2;
