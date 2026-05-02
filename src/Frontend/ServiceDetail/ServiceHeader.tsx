import me from "../assets/me.jpeg";
import fish from "../assets/fish.jpg";
import profileRatingsIcon from "../assets/profile-ratings-icon.svg";

type ServiceProps = {
  title: string;
  seller: string;
  rating: number;
  reviewsAmount: number;
  about: string;
};

function ServiceHeader({
  title,
  seller,
  rating,
  reviewsAmount,
  about,
}: ServiceProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl text-[#2C2A51]">{title}</h2>
      <div className="flex gap-3 items-center">
        <img
          src={me}
          className="rounded-full w-12 h-12 border border-[#91FEEF]"
        ></img>
        <div className="flex flex-col">
          <span className="font-bold text-[#2C2A51]">{seller}</span>
          <div className="flex items-center gap-1 text-sm">
            <img src={profileRatingsIcon} className="w-3 h-3" />
            <span className="text-[#2C2A51] font-bold">{rating}</span>
            <span className="text-[#5A5781]">({reviewsAmount} reviews)</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <img src={fish} className="h-full w-full rounded-2xl object-cover" />
        <div className="grid w-full gap-3">
          <img src={fish} className="h-full w-full rounded-2xl object-cover" />
          <img src={fish} className="h-full w-full rounded-2xl object-cover" />
        </div>
      </div>
    </div>
  );
}

export default ServiceHeader;
