import Footer from "../Footer";

import AboutService from "./Components/AboutService";
import AboutSeller from "./Components/AboutSeller";
import ClientReflections from "./Components/ClientReflections";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Gig } from "../types/Gig";
import { fetchProfile } from "../utils/GetProfile";
import type { PublicProfile } from "../ProfilePage/types";
import ServiceHeader from "./Components/ServiceHeader";
import NavBar from "../NavBar/NavBar";
import PurchaseOptions from "./Components/PurchaseOptions";

type props = {
  mainCategory: string | null;
  subCategoryOne: string | null;
  subCategoryTwo: string | null;
};

function ServiceDetail({
  mainCategory,
  subCategoryOne,
  subCategoryTwo,
}: props) {
  /*Temporary variables for demo */
  mainCategory = "Graphics & Design";
  subCategoryOne = "Logo Design";
  subCategoryTwo = "Modern Branding";
  const { gigId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [gig, setGig] = useState<Gig>();

  /* Const variables for calc gig reviews/reflections  */
  const reviews = gig?.reviews ?? [];

  const reviewsAmount = reviews.length;

  const averageRating =
    reviewsAmount > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsAmount
      : 0;

  const getGig = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/"}${gigId}`,
    );
    const data = await response.json();
    console.log(data);
    setLoaded(true);
    response.ok && setGig(data);
  };

  const [profile, setProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    (async () => {
      const userProfile = await fetchProfile(gig!.sellerUsername!);
      setProfile(userProfile!);
    })();
  }, [gig]);

  useEffect(() => {
    getGig();
  }, []);

  const [profilePictures, setProfilePictures] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const loadPictures = async () => {
      if (!gig) return;

      const uniqueUsers = [
        ...new Set(gig.reviews?.map((review) => review.username)),
      ];

      const entries = await Promise.all(
        uniqueUsers.map(async (username) => {
          const profile = await fetchProfile(username);

          return [username, profile?.profilePictureUrl];
        }),
      );

      setProfilePictures(Object.fromEntries(entries));
    };

    loadPictures();
  }, [gig]);

  console.log(gigId);
  return (
    <>
      <NavBar />
      {!loaded && "Loading..."}

      {loaded && !gig && "Not found!"}

      {loaded && gig && (
        <div className="bg-[#f9f5ff]">
          {/* Service category section */}
          <main className="flex flex-col gap-3 bg-[#f9f5ff] mx-auto px-6 lg:px-24 py-6 container">
            <div className="flex flex-col place-self-center gap-6 ld:w-[75vw]">
              <span className="flex gap-1">
                {gig.category?.main} {">"} {gig.category?.sub}
              </span>

              {/*  ServiceHeader and PurchaseOptions */}
              <div className="flex md:flex-row flex-col gap-6 w-full">
                <div className="w-full md:w-2/3">
                  <ServiceHeader
                    title={gig?.title}
                    seller={gig?.sellerUsername}
                    gig={gig}
                    profile={profile}
                    rating={averageRating}
                    reviewsAmount={reviewsAmount}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <PurchaseOptions
                    options={{
                      Basic: gig.basic,
                      Standard: gig.standard,
                      Premium: gig.premium,
                    }}
                    gigId={gigId!}
                  />
                </div>
              </div>
              {/* About service and client reflections */}
              <div className="flex flex-col gap-6 md:w-2/3">
                <AboutService about={gig?.description} />
                <AboutSeller profile={profile} />
                <ClientReflections
                  reviews={reviews}
                  profilePictures={profilePictures}
                  averageRating={averageRating}
                  reviewsAmount={reviewsAmount}
                />
              </div>
            </div>
          </main>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ServiceDetail;
