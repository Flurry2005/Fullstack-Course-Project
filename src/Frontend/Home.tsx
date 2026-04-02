import Navbar from "./NavBar";
import Section1 from "./Components/HomePageComponents/Section1";
import Section2 from "./Components/HomePageComponents/Section2";
import Section3 from "./Components/HomePageComponents/Section3";
import Section4 from "./Components/HomePageComponents/Section4";
import Footer from "./Footer";

function Home() {
  return (
    <main className="bg-[#f9f5ff] w-full h-screen">
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </main>
  );
}

export default Home;
