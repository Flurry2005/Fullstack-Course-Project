import NavBar from "../NavBar";
import Footer from "../Footer";
import ServiceHeader from "./ServiceHeader";
import PurchaseOptions from "./PurchaseOptions";
import AboutService from "./AboutService";
import AboutSeller from "./AboutSeller";
import ClientReflections from "./ClientReflections";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Gig } from "../types/Gig";

type MainProps = {
  mainCategory: string | null;
  subCategoryOne: string | null;
  subCategoryTwo: string | null;
};

function Main({ mainCategory, subCategoryOne, subCategoryTwo }: MainProps) {
  /*Temporary variables for demo */
  mainCategory = "Graphics & Design";
  subCategoryOne = "Logo Design";
  subCategoryTwo = "Modern Branding";
  const { gigId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [gig, setGig] = useState<Gig>();

  const getGig = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/"}${gigId}`,
    );
    const data = await response.json();
    console.log(data);
    setLoaded(true);
    response.ok && setGig(data);
  };

  useEffect(() => {
    getGig();
  }, []);
  console.log(gigId);
  return (
    <>
      <NavBar />
      {!loaded && "Loading..."}

      {loaded && !gig && "Not found!"}

      {loaded && gig && (
        <>
          {/* Service category section */}
          <main className="flex flex-col gap-3  bg-[#f9f5ff] p-6">
            <div className="flex place-self-center gap-6 flex-col ld:w-[75vw]">
              <span className="flex gap-1">
                {gig.category?.main} {">"} {gig.category?.sub}
              </span>

              {/*  ServiceHeader and PurchaseOptions */}
              <div className="flex flex-col md:flex-row w-full gap-6">
                <div className="w-full md:w-2/3">
                  <ServiceHeader
                    title={gig?.title}
                    seller={gig?.sellerUsername}
                    rating={4.9}
                    reviewsAmount={494}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <PurchaseOptions
                    options={{
                      Basic: gig.basic,
                      Standard: gig.standard,
                      Premium: gig.premium,
                    }}
                  />
                </div>
              </div>
              {/* About service and client reflections */}
              <div className="flex flex-col gap-6 md:w-2/3">
                <AboutService about={gig?.description} />
                <AboutSeller id={gig?.sellerId} />
                <ClientReflections />
              </div>
            </div>
          </main>
        </>
      )}

      <Footer />
    </>
  );
}

export default Main;
