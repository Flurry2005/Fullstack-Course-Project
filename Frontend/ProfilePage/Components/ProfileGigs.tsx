import { useNavigate } from "react-router-dom";
import fishImage from "../../assets/fish.jpg";
import type { Gig } from "../../types/Gig";
import { getStartingPrice } from "../profileUtils";

type ProfileGigsProps = {
  gigs: Gig[];
  isLoading: boolean;
  isOwnProfile: boolean;
};

function ProfileGigs({ gigs, isLoading, isOwnProfile }: ProfileGigsProps) {
  const navigate = useNavigate();

  return (
    <section>
      {/* Section title and owner-only create button */}
      <div className="flex justify-between items-end gap-4 mb-6 pb-4 border-[#E5E0F2] border-b min-h-[62px]">
        <div>
          <h2 className="font-bold text-[#2C2A51] text-[28px] leading-none">
            Active Gigs
          </h2>
        </div>

        {isOwnProfile ? (
          <button
            type="button"
            onClick={() => navigate("/dashboard/create")}
            className="bg-white px-5 py-3 border border-[#DDD9FF] hover:border-[#0050D4] rounded-full font-bold text-[#0050D4] text-sm transition cursor-pointer"
          >
            Create Gig
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/dashboard/create")}
            className="hidden bg-white px-5 py-3 border border-[#DDD9FF] hover:border-[#0050D4] rounded-full font-bold text-[#0050D4] text-sm transition cursor-pointer"
          >
            Create Gig
          </button>
        )}
      </div>

      {/* Loading, populated, and empty states for the seller's gigs */}
      {isLoading ? (
        <div className="flex justify-center items-center bg-white border border-[#E5E0F2] min-h-[220px] text-[#5A5781] text-sm">
          Loading gigs...
        </div>
      ) : gigs.length > 0 ? (
        <div className="gap-5 grid md:grid-cols-2">
          {gigs.map((gig) => (
            <article
              key={gig._id}
              // Opens the existing service detail page for this gig.
              onClick={() =>
                navigate(
                  `/services/${gig.category?.main_slug}/${gig.category?.sub_slug}/${gig._id}`,
                )
              }
              className="bg-white hover:shadow-[0_18px_40px_rgba(90,87,129,0.12)] p-3 border border-[#E5E0F2] rounded-sm overflow-hidden transition hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative bg-[#F3EEFF] rounded-md aspect-[1.58] overflow-hidden">
                <img
                  src={gig.primaryImagePreview || fishImage}
                  alt={gig.title ?? "Gig cover"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-2 pt-5">
                <span className="bg-[#F3EEFF] px-3 py-1 rounded-full font-bold text-[#5F00FF] text-[10px] uppercase">
                  {gig.category?.sub ?? "Service"}
                </span>
                <h3 className="mt-4 min-h-14 font-bold text-[#2C2A51] text-lg leading-6">
                  {gig.title ?? "Untitled service"}
                </h3>
                <p className="mt-2 text-[#5A5781] text-sm line-clamp-2 leading-5">
                  {gig.description}
                </p>

                <div className="flex justify-between items-end mt-6">
                  <div className="flex items-center gap-1 text-sm">
                    <i className="text-[#5F00FF] text-xs fa-solid fa-star"></i>
                    <span className="font-bold text-[#2C2A51]">
                      {gig.rating ? gig.rating.toFixed(1).toString() : "0.0"}
                    </span>
                    <span className="text-[#6F6F9A]">
                      ({gig.reviews?.length || "0"})
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 text-right">
                    <span className="font-medium text-[#5A5781] text-xs">
                      Starting at
                    </span>
                    <span className="font-extrabold text-[#0050D4] text-xl leading-6">
                      {getStartingPrice(gig)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-[#F8F5FF] px-6 border border-[#E5E0F2] min-h-[280px] text-center">
          <i className="mb-4 text-[#C7BDF6] text-3xl fa-solid fa-briefcase"></i>
          <h3 className="font-bold text-[#2C2A51] text-lg">
            No gigs listed yet
          </h3>
          <p className="mt-2 max-w-md text-[#5A5781] text-sm">
            {isOwnProfile
              ? "Create a gig when you are ready to show your services here."
              : "This seller has not published any services yet."}
          </p>
        </div>
      )}
    </section>
  );
}

export default ProfileGigs;
