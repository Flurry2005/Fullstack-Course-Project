import { useAuth } from "../../Context/useAuth";
import type { Gig } from "../../types/Gig";
import type { Order } from "../../types/Order";
import StatusBadge from "../Components/StatusBadge";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface props {
  order: Order;
  gig: Gig | undefined;
  profilePictures: Record<string, string>;
  currentUsername: string;
  onOrderUpdated: (updatedOrder: Order) => void;
}

function OrderCard({
  order,
  gig,
  profilePictures,
  currentUsername,
  onOrderUpdated,
}: props) {
  const [toggleInfo, setToggleInfo] = useState(false);
  const { user } = useAuth();
  const [dueDateLabel, setDueDateLabel] = useState("");
  const isSeller = order.sellerUsername === currentUsername;
  const apiUrl =
    import.meta.env.VITE_DEV === "true"
      ? "http://localhost:3000"
      : "https://fullstackapi.liamjorgensen.dev";
  const showSellerConfirm =
    isSeller &&
    (order.delivered === "In Progress" || order.delivered === "Revision");

  const [loading, setLoading] = useState(false);
  const patchOrder = async (endpoint: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/${order._id}/${endpoint}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) onOrderUpdated(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const update = () => {
      const diffMs = new Date(order.dueDate).getTime() - Date.now();
      const absMs = Math.abs(diffMs);

      const value =
        absMs >= 1000 * 60 * 60 * 24
          ? `${Math.floor(absMs / (1000 * 60 * 60 * 24))} Day${Math.floor(absMs / (1000 * 60 * 60 * 24)) !== 1 ? "s" : ""}`
          : absMs >= 1000 * 60 * 60
            ? `${Math.floor(absMs / (1000 * 60 * 60))}h`
            : `${Math.floor(absMs / (1000 * 60))} min`;

      setDueDateLabel(diffMs < 0 ? `${value} ago` : `${value}`);
    };

    update();
    const interval = setInterval(update, 60 * 1000);

    return () => clearInterval(interval);
  }, [order.dueDate]);

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
      <div className="flex flex-col gap-6 bg-white p-6 border-[#ACA8D7]/15 border-7 rounded-2xl w-full h-fit">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex gap-3 w-fit">
            <Link to={`/profile/${order.buyerUsername}`}>
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
            </Link>
            <div className="flex flex-col">
              <Link to={`/profile/${order.buyerUsername}`}>
                <span className="font-semibold text-[#2C2A51]">
                  {order.buyerUsername}
                </span>
              </Link>
              <Link
                to={`/services/${gig?.category?.main_slug}/${gig?.category?.sub_slug}/${gig?._id}`}
              >
                <span className="text-[#5A5781]">{order.gigname}</span>
              </Link>
            </div>
          </div>

          <StatusBadge status={order?.delivered} />
        </div>

        <div className="flex flex-col gap-3 py-3 border-[#f0eef8] border-t">
          <div className="flex flex-col">
            <span className="text-[#5A5781] text-sm">Due in</span>
            <div className="flex items-center">
              <span
                className={`flex px-3 mx-auto gap-3 font-semibold text-xl ${dueDateLabel.includes("ago") ? "text-red-400" : ""}`}
              >
                {dueDateLabel}
              </span>
            </div>
            <span
              onClick={() => setToggleInfo((prev) => !prev)}
              className={`${toggleInfo ? "opacity-50" : ""} hover:opacity-50 text-[#ffffff] rounded-full shadow-md cursor-pointer ml-auto inline-grid place-items-center bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] border-[#b4b1b1] w-7 h-7 p-0`}
            >
              {toggleInfo ? (
                <span className="block bg-white rounded-full w-3 h-0.5"></span>
              ) : (
                <span className="block relative w-3 h-3">
                  <span className="top-1/2 left-0 absolute bg-white rounded-full w-3 h-0.5 -translate-y-1/2"></span>
                  <span className="top-0 left-1/2 absolute bg-white rounded-full w-0.5 h-3 -translate-x-1/2"></span>
                </span>
              )}
            </span>
          </div>
          {toggleInfo && (
            <>
              <div className="flex flex-col justify-between gap-3 bg-[#C3C0FF]/10 shadow-md px-3 py-1 border-[#f0eef8] border-t text-[#3525CD]">
                <div className="flex flex-col">
                  <span className="font-semibold text-[10px] uppercase leading-3">
                    Service
                  </span>
                  <span className="ml-auto">
                    <Link
                      to={`/services/${gig?.category?.main_slug}/${gig?.category?.sub_slug}/${gig?._id}`}
                    >
                      {gig?.title || order.gigname}
                    </Link>
                  </span>{" "}
                </div>

                <div className="flex flex-col border-t border-t-[#f0eef8]">
                  <span className="font-semibold text-[10px] uppercase leading-3">
                    Plan
                  </span>
                  <span className="ml-auto">
                    {order.gigTier.charAt(0).toUpperCase()}
                    {order.gigTier.substring(1).toLowerCase()}
                  </span>
                </div>
                <div className="flex flex-col border-t border-t-[#f0eef8]">
                  <span className="font-semibold text-[10px] uppercase leading-3">
                    Total
                  </span>
                  <span className="ml-auto">
                    {selectedPrice !== undefined && selectedPrice !== null
                      ? `$${selectedPrice}`
                      : "Price unavailable"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-3 font-semibold">
                {showSellerConfirm ? (
                  <button
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 px-3 py-2 rounded-lg font-semibold text-white text-xs transition-colors cursor-pointer"
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      patchOrder("confirm-seller");
                    }}
                  >
                    Mark as delivered
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderCard;
