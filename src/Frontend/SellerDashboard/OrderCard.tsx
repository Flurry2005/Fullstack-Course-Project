import me from "../assets/me.jpeg";
import { useAuth } from "../Context/useAuth";
import type { Gig } from "../types/Gig";
import type { Order } from "../types/Order";
import StatusBadge from "./StatusBadge";

interface props {
  order: Order;
  gig: Gig | undefined;
}

function OrderCard({ order, gig }: props) {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-col gap-6 bg-white p-6 border-[#ACA8D7]/15 border-7 rounded-2xl w-full">
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-3">
            <img
              className="rounded-full w-16 h-16"
              src={
                order.buyerUsername === user?.username
                  ? `https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/${order.sellerUsername}-profilePicture?_a=BAMAPqUs0&t=1778358700344`
                  : `https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/${order.buyerUsername}-profilePicture?_a=BAMAPqUs0&t=1778358700344`
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
          <StatusBadge status={true} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#5A5781] text-sm">Due in</span>
          <div className="flex">
            <span className="font-semibold text-2xl">
              {Math.floor(
                (new Date(order.dueDate).setHours(0, 0, 0, 0) -
                  new Date().setHours(0, 0, 0, 0)) /
                  (1000 * 60 * 60 * 24),
              )}{" "}
              Days
            </span>
            <span className="ml-auto text-[#0050D4] text-2xl">
              $
              {order.gigTier === "basic"
                ? gig?.basic?.price
                : order.gigTier === "standard"
                  ? gig?.standard?.price
                  : gig?.premium?.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
