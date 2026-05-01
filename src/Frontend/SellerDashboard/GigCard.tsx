import thumbnail from "../assets/fish.jpg";
import viewsIcon from "../assets/views-icon.svg";
import checkoutsIcon from "../assets/checkouts-icon.svg";
import ratingsIcon from "../assets/gig-ratings-icon.svg";

type GigCardProps = {
  title: string;
  views: number;
  checkouts: number;
  price: number;
  rating: number;
  reviewerAmount: number;
};

function GigCard({
  title,
  views,
  checkouts,
  price,
  rating,
  reviewerAmount,
}: GigCardProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-40 object-cover rounded-t-2xl border-x-2 border-t-2 border-[#ACA8D7]/15"
          />
          <span className="bg-white w-fit px-3 py-1 z-10 absolute items-center top-3 right-3 font-semibold rounded-2xl text-sm flex gap-1 text-[#0050D4]">
            <img src={ratingsIcon} className="w-4 h-4" />
            {rating} ({reviewerAmount})
          </span>
        </div>
        <div className="bg-white h-full p-6 flex flex-col gap-3 rounded-b-2xl border-x-2 border-b-2 border-[#ACA8D7]/15">
          <h4 className="text-2xl text-[#2C2A51]">{title}</h4>
          <div className="flex gap-3 mt-auto">
            <span className="flex gap-1 place-items-center text-[#5A5781]">
              <img src={viewsIcon} className="w-4" />
              {views}
            </span>
            <span className="flex gap-1 place-items-center text-[#5A5781]">
              <img src={checkoutsIcon} className="w-4" />
              {checkouts}
            </span>
            <span className="ml-auto text-[#0050D4] font-semibold">
              From ${price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GigCard;
