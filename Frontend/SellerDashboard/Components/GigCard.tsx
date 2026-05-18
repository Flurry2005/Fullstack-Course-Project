import thumbnail from "../../assets/fish.jpg";
import viewsIcon from "../../assets/views-icon.svg";
import checkoutsIcon from "../../assets/checkouts-icon.svg";
import ratingsIcon from "../../assets/profile-ratings-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import { Link } from "react-router-dom";
import type { Gig } from "../../types/Gig";

type GigCardProps = {
  id: string | any;
  title: string | any;
  views: number | any;
  checkouts: number;
  price: number | any;
  rating: string;
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
              className="top-3 left-3 z-10 absolute w-9 h-9 cursor-pointer"
            >
              <img
                src={editIcon}
                className="bg-white/50 hover:bg-white/90 p-2 rounded-full w-10 h-9"
                alt="Edit"
              />
            </button>
          </Link>
          <span className="top-3 right-3 z-10 absolute flex items-center gap-1 bg-white px-3 py-1 rounded-2xl w-fit font-semibold text-[#2c2a51] text-sm">
            <img src={ratingsIcon} className="w-4 h-4" />
            {rating} <span className="text-[#838384]">({reviewerAmount})</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 bg-white p-6 border-[#ACA8D7]/15 border-x-2 border-b-2 rounded-b-2xl h-full">
          <h4 className="text-[#2C2A51] text-2xl">{title}</h4>

          <div className="flex justify-between items-end">
            <div className="flex items-end w-full h-fit">
              <span className="flex items-center gap-3 text-[#5A5781] text-sm">
                <span className="flex items-center gap-1">
                  <img src={viewsIcon} className="w-4 h-4" alt="Views" />
                  {views}
                </span>
                <span className="flex items-center gap-1">
                  <img
                    src={checkoutsIcon}
                    className="w-4 h-4"
                    alt="Checkouts"
                  />
                  {checkouts}
                </span>
              </span>

              <span className="ml-auto min-w-17.5 text-right">
                <span className="block font-bold text-[#5a5781] text-[10px] uppercase leading-3">
                  Starting at
                </span>
                <span className="block font-bold text-[#1857f7] text-lg leading-6">
                  ${price}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GigCard;
