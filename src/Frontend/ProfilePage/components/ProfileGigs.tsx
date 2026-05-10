import { useNavigate } from "react-router-dom";
import fishImage from "../../assets/fish.jpg";
import type { Gig } from "../../types/Gig";
import { getStartingPrice } from "../profileUtils";

type ProfileGigsProps = {
  gigs: Gig[];
  isLoading: boolean;
  isOwnProfile: boolean;
};

function ProfileGigs({
  gigs,
  isLoading,
  isOwnProfile,
}: ProfileGigsProps) {
  const navigate = useNavigate();

  return (
    <section>
      {/* Section title and owner-only create button */}
      <div className="mb-6 flex min-h-[62px] items-end justify-between gap-4 border-b border-[#E5E0F2] pb-4">
        <div>
          <h2 className="text-[28px] font-bold leading-none text-[#2C2A51]">
            Active Gigs
          </h2>
        </div>

        {isOwnProfile ? (
          <button
            type="button"
            onClick={() => navigate("/dashboard/create")}
            className="rounded-full border border-[#DDD9FF] bg-white px-5 py-3 text-sm font-bold text-[#0050D4] transition hover:border-[#0050D4]"
          >
            Create Gig
          </button>
        ) : (
          gigs.length > 3 && (
            <button
              type="button"
              className="text-sm font-bold text-[#5F00FF] transition hover:text-[#0050D4]"
            >
              See All <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
            </button>
          )
        )}
      </div>

      {/* Loading, populated, and empty states for the seller's gigs */}
      {isLoading ? (
        <div className="flex min-h-[220px] items-center justify-center border border-[#E5E0F2] bg-white text-sm text-[#5A5781]">
          Loading gigs...
        </div>
      ) : gigs.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {gigs.map((gig) => (
            <article
              key={gig._id}
              // Opens the existing service detail page for this gig.
              onClick={() =>
                navigate(
                  `/services/${gig.category?.main_slug}/${gig.category?.sub_slug}/${gig._id}`,
                )
              }
              className="cursor-pointer overflow-hidden rounded-sm border border-[#E5E0F2] bg-white p-3 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,87,129,0.12)]"
            >
              <div className="relative aspect-[1.58] overflow-hidden rounded-md bg-[#F3EEFF]">
               
                <img
                  src={gig.primaryImagePreview || fishImage}
                  alt={gig.title ?? "Gig cover"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="px-2 pt-5">
                <span className="rounded-full bg-[#F3EEFF] px-3 py-1 text-[10px] font-bold uppercase text-[#5F00FF]">
                  {gig.category?.sub ?? "Service"}
                </span>
                <h3 className="mt-4 min-h-14 text-lg font-bold leading-6 text-[#2C2A51]">
                  {gig.title ?? "Untitled service"}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#5A5781]">
                  {gig.description}
                </p>

                <div className="mt-6 flex items-end justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <i className="fa-solid fa-star text-xs text-[#5F00FF]"></i>
                    <span className="font-bold text-[#2C2A51]">5.0</span>
                    <span className="text-[#6F6F9A]">(0)</span>
                  </div>

                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-xs font-medium text-[#5A5781]">
                      Starting at
                    </span>
                    <span className="text-xl font-extrabold leading-6 text-[#0050D4]">
                      {getStartingPrice(gig)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center border border-[#E5E0F2] bg-[#F8F5FF] px-6 text-center">
          <i className="fa-solid fa-briefcase mb-4 text-3xl text-[#C7BDF6]"></i>
          <h3 className="text-lg font-bold text-[#2C2A51]">
            No gigs listed yet
          </h3>
          <p className="mt-2 max-w-md text-sm text-[#5A5781]">
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
