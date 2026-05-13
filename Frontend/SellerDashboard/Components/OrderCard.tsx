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
  return (
    <>
      <div className="flex flex-col h-fit gap-6 bg-white p-6 border-[#ACA8D7]/15 border-7 rounded-2xl w-full">
        <div className="flex flex-wrap gap-2">
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
          <span className="ml-auto cursor-pointer">
            <StatusBadge status={true} />
          </span>
        </div>
        <div className="flex flex-col border-t py-3 gap-3 border-[#f0eef8]">
          <span className="text-[#5A5781] text-sm">Due in</span>
          <div className="flex items-center">
            <span
              className={`flex items-center gap-3 font-semibold text-xl ${dueDate < 1 ? "text-[#ff0000]" : ""}`}
            >
              {dueDate} Days
              {dueDate < 1 && (
                <img src={bellIcon} className="w-3 h-3 animate-ping" />
              )}
            </span>

            <img
              onClick={() => setToggleInfo((prev) => !prev)}
              src={infoIcon}
              className={`${toggleInfo ? "opacity-50" : ""} hover:opacity-50 cursor-pointer ml-auto w-7 h-7`}
            />
          </div>
          {toggleInfo && (
            <div className=" p-3 text-[#3525CD] bg-[#C3C0FF]/10 border-t justify-between border-[#f0eef8] gap-3 flex flex-col mt-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Service
                </span>
                <span className="text-xl ml-auto">{gig?.title}</span>
              </div>

              <div className="flex flex-col border-t border-t-[#f0eef8]">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Plan
                </span>
                <span className="text-xl ml-auto">
                  {order.gigTier.charAt(0).toUpperCase()}
                  {order.gigTier.substring(1).toLowerCase()}
                </span>
              </div>
              <div className="flex flex-col border-t border-t-[#f0eef8]">
                <span className="text-[10px] font-semibold uppercase leading-3">
                  Total
                </span>
                <span className="text-xl ml-auto">
                  $
                  {order.gigTier === "basic"
                    ? gig?.basic?.price
                    : order.gigTier === "standard"
                      ? gig?.standard?.price
                      : gig?.premium?.price}
                </span>
              </div>
              <div className=" border-t border-t-[#f0eef8] flex justify-between gap-3 font-semibold flex-wrap">
                <span className="
                 bg-red-400 rounded-lg text-white px-3 py-1 mt-3 cursor-pointer gap-1 flex items-center text-sm">
                  Cancel order
                </span>{" "}
                <span className="text-white rounded-lg bg-[#4F46E5] px-3 py-1  mt-3 cursor-pointer flex gap-1 text-sm items-center">
                  Mark as delivered
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
