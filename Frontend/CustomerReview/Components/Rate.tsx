import starIcon from "../../assets/profile-ratings-icon.svg";
import { useState } from "react";

type RateProps = {
    setRating: React.Dispatch<React.SetStateAction<number>>;
    rating: number;
}
function Rate({setRating, rating} : RateProps) {
  const [oneSelected, setOneHover] = useState(false);
  const [twoSelected, setTwoHover] = useState(false);
  const [threeSelected, setThreeHover] = useState(false);
  const [fourHover, setFourHover] = useState(false);
  const [fiveHover, setFiveHover] = useState(false);
  const [comment, setComment] = useState(5);

  const comments = [
    "Needs Improvement",
    "Below Expectations",
    "Meets Expectations",
    "Exceeds Expectations",
    "Outstanding",
    "Select your rating",
  ];

  return (
    <div className="flex flex-col border shadow-md/5 bg-white border-[#E2E8F0] rounded-2xl w-full px-12">
      <div className="py-6 items-center flex flex-col gap-6">
        <span className="font-semibold text-[#131B2E] text-xl">
          How would you rate this service?
        </span>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-3 flex-wrap items-center">
            <img
              src={starIcon}
              onMouseEnter={() => {
                (setOneHover(true), setComment(0));
              }}
              onMouseOut={() => {
                (setOneHover(false),
                  rating < 1 ? setComment(5) : setComment(rating - 1));
              }}
              className={`hover:opacity-50 cursor-pointer ${rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5 || fiveHover || fourHover || threeSelected || twoSelected || oneSelected ? "" : "grayscale"} md:w-12 md:h-12 w-4 h-4`}
              onClick={() => setRating(1)}
            />
            <img
              onMouseEnter={() => {
                (setTwoHover(true), setComment(1));
              }}
              onMouseOut={() => {
                (setTwoHover(false),
                  rating < 1 ? setComment(5) : setComment(rating - 1));
              }}
              src={starIcon}
              className={`hover:opacity-50 cursor-pointer ${rating === 2 || rating === 3 || rating === 4 || rating === 5 || fiveHover || fourHover || threeSelected || twoSelected ? "" : "grayscale"}  md:w-12 md:h-12 w-4 h-4`}
              onClick={() => setRating(2)}
            />
            <img
              onMouseEnter={() => {
                (setThreeHover(true), setComment(2));
              }}
              onMouseOut={() => {
                (setThreeHover(false),
                  rating < 1 ? setComment(5) : setComment(rating - 1));
              }}
              src={starIcon}
              className={`hover:opacity-50 cursor-pointer ${rating === 3 || rating === 4 || rating === 5 || fiveHover || fourHover || threeSelected ? "" : "grayscale"}  md:w-12 md:h-12 w-4 h-4`}
              onClick={() => setRating(3)}
            />
            <img
              onMouseEnter={() => {
                (setFourHover(true), setComment(3));
              }}
              onMouseOut={() => {
                (setFourHover(false),
                  rating < 1 ? setComment(5) : setComment(rating - 1));
              }}
              src={starIcon}
              className={`hover:opacity-50 cursor-pointer ${rating === 4 || rating === 5 || fiveHover || fourHover ? "" : "grayscale"}  md:w-12 md:h-12 w-4 h-4`}
              onClick={() => setRating(4)}
            />
            <img
              onMouseEnter={() => {
                (setFiveHover(true), setComment(4));
              }}
              onMouseOut={() => {
                (setFiveHover(false),
                  rating < 1 ? setComment(5) : setComment(rating - 1));
              }}
              src={starIcon}
              className={`hover:opacity-50 cursor-pointer ${rating === 5 || fiveHover ? "" : "grayscale"}  md:w-12 md:h-12 w-4 h-4`}
              onClick={() => setRating(5)}
            />
          </div>
          <span className={`text-[#464555] font-medium`}>
            {comments[comment]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Rate;
