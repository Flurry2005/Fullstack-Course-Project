import { useAuth } from "../../Context/useAuth";
import type { Gig } from "../../types/Gig";
import type { Order } from "../../types/Order";
import StatusBadge from "../Components/StatusBadge";
import bellIcon from "../../assets/bell-icon.svg";
import infoIcon from "../../assets/info-icon.svg";
import { useState } from "react";

interface props {
  order: Order;
  gig: Gig | undefined;
  profilePictures: Record<string, string>;
}

function OrderCard({ order, gig, profilePictures }: props) {
  const [toggleInfo, setToggleInfo] = useState(false);
  const { user } = useAuth();
  const dueDate = Math.floor(
    (new Date(order.dueDate).setHours(0, 0, 0, 0) -
      new Date().setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24),
  );
  const tier = order.gigTier?.toLowerCase();
  const selectedPrice =
    tier === "basic"
      ? gig?.basic?.price
      : tier === "standard"
        ? gig?.standard?.price
        : tier === "premium"
          ? gig?.premium?.price
          : undefined;


  return (
    <>
      <div className="flex flex-col h-fit gap-6 bg-white p-6 border-[#ACA8D7]/15 border-7 rounded-2xl w-full">
        <div className="flex flex-wrap gap-2 relative">
          <div className="relative w-full">
          <div className="flex gap-3">
            <img
              className="rounded-full w-16 h-16"
              src={
                order.buyerUsername === user?.username
                  ? profilePictures[order.sellerUsername]
                  : profilePictures[order.buyerUsername]
              }
              alt="Picture of customer"
              onError={(e) => {
                e.currentTarget.src =
                  "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
              }}
            ></img>
            <div className="flex flex-col">
              <span className="font-semibold text-[#2C2A51]">
                {order.buyerUsername}
              </span>
              <span className="text-[#5A5781]">{order.gigname}</span>
            </div>
          </div>
          </div>
          <span className="absolute right-0 top-0 cursor-pointer">
            <StatusBadge status={true} />
          </span>
        </div>
        <div className="flex flex-col border-t py-3 gap-3 border-[#f0eef8]">
          <div className="flex flex-col items-center">
          <span className="text-[#5A5781] text-sm">Due in</span>
          <div className="flex items-center">
            <span
              className={`flex px-3 items-center gap-3 font-semibold text-xl ${dueDate < 1 ? "text-red-400" : ""}`}
            >
             {dueDate < 0 ? `${Math.abs(dueDate)} days ago` : `${dueDate} days`}
            </span>
      
          </div>
           <span
              onClick={() => setToggleInfo((prev) => !prev)}
              className={`${toggleInfo ? "opacity-50" : ""} hover:opacity-50 text-[#3525CD]  text-2xl font-semibold cursor-pointer ml-auto w-7 h-7`}
            >[{toggleInfo ? "−" : "+"}]</span>
          </div>
          {toggleInfo && (
            <>
            <div className=" px-3 py-1 text-[#3525CD] bg-[#C3C0FF]/10 border-t justify-between border-[#f0eef8] gap-3 flex flex-col">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Service
                </span>
                <span className="ml-auto">{gig?.title || order.gigname}</span>            </div>

              <div className="flex flex-col border-t border-t-[#f0eef8]">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Plan
                </span>
                <span className="ml-auto">
                  {order.gigTier.charAt(0).toUpperCase()}
                  {order.gigTier.substring(1).toLowerCase()}
                </span>
              </div>
              <div className="flex flex-col border-t border-t-[#f0eef8]">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Total
                </span>
                <span className="ml-auto">
                  {selectedPrice !== undefined && selectedPrice !== null
                    ? `$${selectedPrice}`
                    : "Price unavailable"}
                </span>
              </div>
             
            </div>
             <div className="   flex justify-between gap-3 font-semibold flex-wrap">
                <span
                  className="
                 bg-white rounded-lg border border-red-400 text-red-400 px-3 py-1 mt-3 cursor-pointer gap-1 flex items-center text-sm"
                >
                  Cancel order
                </span>{" "}
                <span className="text-[#4F46E5] border border-[#4F46E5] rounded-lg bg-white px-3 py-1  mt-3 cursor-pointer flex gap-1 text-sm items-center">
                  Finish order
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
