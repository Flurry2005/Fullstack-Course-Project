import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";
import Section1 from "./HomePageComponents/Section1";
import Section2 from "./HomePageComponents/Section2";
import Section3 from "./HomePageComponents/Section3";
import Section4 from "./HomePageComponents/Section4";

function Home() {
  return (
    <main className="bg-[#f9f5ff] w-full min-h-screen overflow-x-hidden">
      <NavBar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </main>
  );
}

export default Home;
