import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import type { Gig } from "../../types/Gig";

const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

function PopularServicesSection() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const fetchGigs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/gig`);
      if (!response.ok) return;

      const allGigs = (await response.json()) as Gig[];

      //Sort the gigs in decending order, basically highest rated first
      const sorted = allGigs.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

      const highRated = sorted.filter((gig) => (gig.rating ?? 0) >= 4);
      const lowRated = sorted.filter((gig) => (gig.rating ?? 0) < 4);

      //Shuffle the high rated ones randomly
      const shuffledHighRated = [...highRated].sort(() => Math.random() - 0.5);

      //Fill with 4 cards of randomly high rated cards of at least 4 stars or higher with a fallback of the next highest rated gigs available
      const result = [...shuffledHighRated, ...lowRated].slice(0, 4);

      setGigs(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <section className="bg-[#f9f5ff] px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-14">
      <div className="mx-auto container">
        <h2 className="my-5 font-semibold text-[#23235b] lg:text-[44px] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Popular Services
        </h2>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gigs.map((gig) => {
            const startingPrice = Math.min(
              ...[gig.basic?.price, gig.standard?.price, gig.premium?.price]
                .filter(
                  (p): p is string | number => Boolean(p) && Number(p) > 0,
                )
                .map(Number),
            );

            return (
              <ServiceCard
                key={gig._id}
                to={`services/${gig.category?.main_slug}/${gig.category?.sub_slug}/${gig._id}`}
                image={
                  gig.primaryImagePreview || "/HomePage/gig_placeholder.png"
                }
                rating={(gig.rating ?? 0).toFixed(1)}
                name={gig.sellerUsername || "Unknown"}
                description={gig.title || ""}
                price={`$${startingPrice}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PopularServicesSection;
