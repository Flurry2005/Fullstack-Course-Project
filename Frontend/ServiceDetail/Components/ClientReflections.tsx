import me from "../../assets/react.svg";
import profileRatingsIcon from "../../assets/profile-ratings-icon.svg";
import type { Review } from "../../types/Gig";
import { Link } from "react-router-dom";
import { useState } from "react";

type ClientReflectionsProps = {
  reviews: Review[];
  profilePictures?: Record<string, string>;
  averageRating: number;
  reviewsAmount: number;
};

function ClientReflections({
  reviews,
  profilePictures,
  averageRating,
  reviewsAmount,
}: ClientReflectionsProps) {

  const [sliceAmount, setSliceAmount] = useState(5);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h5 className="text-[#2C2A51] text-2xl">Client Reflections</h5>
        <span className="flex flex-wrap gap-1 ml-auto">
          <span className="flex font-bold text-[#2C2A51] max-sm:text-sm">
            <img src={profileRatingsIcon} className="w-6 h-6" />
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </span>
          <span className="text-[#5A5781] max-sm:text-sm">
            ({reviewsAmount} Reviews)
          </span>
        </span>
      </div>

      {reviews.slice(0, sliceAmount).map((e) => (
        <div
          key={e.username}
          className="flex flex-col gap-3 p-6 border border-[#ACA8D7]/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 w-full">
            <img
              src={profilePictures?.[e.username] || me}
              className="rounded-full w-12 h-12"
              alt={e.username}
            />
            <div className="flex flex-col flex-wrap">
              <Link
                to={`/profile/${e.username}`}
                className="font-bold text-[#2C2A51] cursor-pointer"
              >
                {e.username}
              </Link>
              <span className="text-[#5A5781] max-sm:text-xs text-sm">
              {e.createdAt}
              </span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
            <div className="flex flex-wrap">
              {Array.from({ length: e.rating || 0 }, (_, i) => (
                <img key={i} src={profileRatingsIcon} className="w-3 h-3" />
              ))}
            </div>
                 <span className="text-sm text-[#838384]">({e.rating})</span>
            </div>
          </div>
          <p className="text-[#5A5781]">{e.comment}</p>
        </div>
      ))}
      {reviews.length > 3 && (
        <span className="place-self-center cursor-pointer font-bold text-[#0050D4]" onClick={() => sliceAmount > 10 ? setSliceAmount(3) : setSliceAmount(reviews.length)}>
          {sliceAmount > 3 ?  `Show less` : `Read all ${reviews.length} reviews`}
        </span>
      )}
    </div>
  );
}

export default ClientReflections;
