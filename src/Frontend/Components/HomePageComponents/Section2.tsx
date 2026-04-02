import Section2Header from "./Section2Header";
import Section2Grid from "./Section2Grid";

function Section2() {
  return (
    <section className="bg-[#f2ecfc] px-6 md:px-10 lg:px-16 xl:px-20 py-14 w-full">
      <div className="mx-auto max-w-400">
        <Section2Header />
        <Section2Grid />
      </div>
    </section>
  );
}

export default Section2;
