import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";
import GeneralSection from "./HomePageComponents/GeneralSection";
import BrowseByCategorySection from "./HomePageComponents/BrowseByCategorySection";
import PopularServicesSection from "./HomePageComponents/PopularServicesSection";
import FlexSection from "./HomePageComponents/FlexSection";

function Home() {
  return (
    <main className="bg-[#f9f5ff] w-full min-h-screen overflow-x-hidden">
      <NavBar />
      <GeneralSection />
      <BrowseByCategorySection />
      <PopularServicesSection />
      <FlexSection />
      <Footer />
    </main>
  );
}

export default Home;
