import thumbnail from "../assets/fish.jpg";
import viewsIcon from "../assets/views-icon.svg";
import checkoutsIcon from "../assets/checkouts-icon.svg";
import ratingsIcon from "../assets/gig-ratings-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import { Link } from "react-router-dom";
import type { Gig } from "../types/Gig";

type GigCardProps = {
  id: string | any;
  title: string | any;
  views: number | any;
  checkouts: number;
  price: number | any;
  rating: number;
  reviewerAmount: number;
  gig: Gig;
};

function GigCard({
  id,
  title,
  views,
  checkouts,
  price,
  rating,
  reviewerAmount,
  gig,
}: GigCardProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={gig.primaryImagePreview || thumbnail}
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
            alt={title}
            className="border-[#ACA8D7]/15 border-x-2 border-t-2 rounded-t-2xl w-full h-40 object-cover"
          />
          <Link to={`/dashboard/edit/${id}`}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="top-3 left-3 z-10 absolute hover:bg-white/50 p-1 rounded-full w-9 h-9 cursor-pointer"
            >
              <img src={editIcon} className="w-8 h-8" alt="Edit" />
            </button>
          </Link>
          <span className="top-3 right-3 z-10 absolute flex items-center gap-1 bg-white px-3 py-1 rounded-2xl w-fit font-semibold text-[#0050D4] text-sm">
            <img src={ratingsIcon} className="w-4 h-4" />
            {rating} ({reviewerAmount})
          </span>
        </div>
        <div className="flex flex-col gap-3 bg-white p-6 border-[#ACA8D7]/15 border-x-2 border-b-2 rounded-b-2xl h-full">
          <h4 className="text-[#2C2A51] text-2xl">{title}</h4>
          <div className="flex gap-3 mt-auto">
            <span className="flex place-items-center gap-1 text-[#5A5781]">
              <img src={viewsIcon} className="w-4" />
              {views}
            </span>
            <span className="flex place-items-center gap-1 text-[#5A5781]">
              <img src={checkoutsIcon} className="w-4" />
              {checkouts}
            </span>
            <span className="ml-auto font-semibold text-[#0050D4]">
              From ${price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GigCard;
