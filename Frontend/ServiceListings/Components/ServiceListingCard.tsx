import fishImage from "../../assets/fish.jpg";
import type { Listing } from "../ServiceListings";

type Props = {
  listing: Listing;
  onClick: () => void;
  profilePictures: Record<string, string>;
};

function ServiceListingCard({ listing, onClick, profilePictures }: Props) {
  return (
    <article
      onClick={onClick}
      className="bg-white shadow-sm hover:shadow-md p-3 rounded-2xl transition hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative rounded-lg h-56 overflow-hidden">
        <img
          src={listing.primaryImagePreview || fishImage}
          alt={listing.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = fishImage;
          }}
        />
        <span className="top-4 left-4 absolute bg-white px-4 py-1.5 rounded-full font-bold text-[#4f46e5] text-xs uppercase tracking-wide">
          {listing.tag}
        </span>
      </div>

      <div className="px-1 pt-5">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={profilePictures[listing.seller]}
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
            alt={listing.seller}
            className="border-[#1857f7] border-2 rounded-full w-9 h-9 object-cover"
          />
          <div>
            <h2 className="font-bold text-[#2c2a51] text-sm">
              {listing.seller}
            </h2>
            <p className="text-[#6f6f9a] text-xs">{listing.level}</p>
          </div>
        </div>

        <p className="min-h-18 text-[#2c2a51] text-lg leading-6">
          {listing.title}
        </p>

        <div className="flex justify-between items-end mt-5 pt-4 border-[#f0eef8] border-t">
          <div className="flex items-center gap-1 text-sm">
            <i className="text-[#f7b500] text-xs fa-solid fa-star"></i>
            <span className="font-semibold text-[#2c2a51]">
              {listing.rating}
            </span>
            <span className="text-[#6f6f9a]">({listing.reviews})</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#5a5781] text-[10px] uppercase leading-3">
              Starting at
            </p>
            <p className="font-bold text-[#1857f7] text-xl leading-6">
              {listing.price}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ServiceListingCard;
