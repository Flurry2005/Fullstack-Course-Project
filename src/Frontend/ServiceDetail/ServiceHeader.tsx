import me from "../assets/me.jpeg";
import fish from "../assets/fish.jpg";
import profileRatingsIcon from "../assets/profile-ratings-icon.svg";
import type { Gig } from "../types/Gig";

type ServiceProps = {
  title: string | any;
  seller: string | any;
  rating: number;
  reviewsAmount: number;
  gig: Gig;
};

function ServiceHeader({
  title,
  seller,
  rating,
  reviewsAmount,
  gig,
}: ServiceProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#2C2A51] text-4xl">{title}</h2>
      <div className="flex items-center gap-3">
        <img
          src={`https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/profilePictures/${seller}-profilePicture?_a=BAMAPqUs0&t=1778358700344`}
          onError={(e) => {
            e.currentTarget.src =
              "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
          }}
          className="border border-[#91FEEF] rounded-full w-12 h-12"
        ></img>
        <div className="flex flex-col">
          <span className="font-bold text-[#2C2A51]">{seller}</span>
          <div className="flex items-center gap-1 text-sm">
            <img src={profileRatingsIcon} className="w-3 h-3" />
            <span className="font-bold text-[#2C2A51]">{rating}</span>
            <span className="text-[#5A5781]">({reviewsAmount} reviews)</span>
          </div>
        </div>
      </div>
      <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
        <img
          src={
            gig.primaryImagePreview ||
            "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344"
          }
          onError={(e) => {
            e.currentTarget.src =
              "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
          }}
          className="rounded-2xl w-full h-64 md:h-full object-cover"
        />
        <div className="gap-3 grid w-full">
          <img
            src={
              gig.secondaryImagePreview ||
              "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344"
            }
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
            className="rounded-2xl w-full h-32 md:h-full object-cover"
          />
          <img
            src={
              gig.ternaryImagePreview ||
              "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344"
            }
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
            className="rounded-2xl w-full h-32 md:h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceHeader;
