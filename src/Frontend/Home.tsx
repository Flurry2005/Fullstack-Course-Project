import Navbar from "./NavBar";
import Section1 from "./Components/HomePageComponents/Section1";
import Section2 from "./Components/HomePageComponents/Section2";

function Home() {
  return (
    <main className="bg-[#f9f5ff] w-full h-screen">
      <Navbar />
      <Section1 />
      <Section2 />

      <section className="z-0 bg-[#f2ecfc] w-full h-140">COCKs</section>
      <section className="z-0 bg-[#f9f5ff] w-full h-140">COCKs</section>
      <section className="z-0 bg-[#f2ecfc] w-full h-140">COCKs</section>
      <section className="z-0 bg-[#f9f5ff] w-full h-140">COCKs</section>
      <section className="z-0 bg-[#f2ecfc] w-full h-140">COCKs</section>
    </main>
  );
}

export default Home;
