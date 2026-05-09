import { useNavigate } from "react-router-dom";
import me from "../assets/me.jpeg";
import { useAuth } from "../Context/useAuth";
import { useSocket } from "../Context/useSocket";
import type { Order } from "../types/Order";
import { getSocket } from "../socket/Socket";
import { useOrders } from "../Context/useOrders";

type MessageCardProps = {
  read: boolean;
  order: Order;
};

function MessageCard({ read, order }: MessageCardProps) {
  const { user } = useAuth();
  const { setActiveOrder } = useSocket();
  const { setOrders } = useOrders();
  const navigate = useNavigate();

  const formatTimeAgo = (date: string | Date) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";

    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  return (
    <div
      className={`flex ${read ? "" : "bg-white"} rounded-2xl  p-3 gap-3 cursor-pointer`}
      onClick={async () => {
        setActiveOrder(order);
        navigate("/messages");
        await getSocket().emitWithAck("read_chat", {
          orderId: order!._id,
        });
        setOrders((prev) => {
          if (!prev) return null;

          return prev.map((orderTemp) => {
            if (orderTemp._id !== order!._id) {
              return orderTemp;
            }

            return {
              ...orderTemp,
              chathistory: orderTemp.chathistory.map((message) => ({
                ...message,
                readBy: message.readBy.includes(user!._id)
                  ? message.readBy
                  : [...message.readBy, user!._id],
              })),
            };
          });
        });
      }}
    >
      {" "}
      <img
        className="rounded-full w-18 h-18"
        src={
          order.buyerUsername === user?.username
            ? `https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/profilePictures/${order.sellerUsername}-profilePicture?_a=BAMAPqUs0&t=1778358700344`
            : `https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/profilePictures/${order.buyerUsername}-profilePicture?_a=BAMAPqUs0&t=1778358700344`
        }
        onError={(e) => {
          e.currentTarget.src =
            "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
        }}
        alt="Picture of profile"
      ></img>
      <div className="flex flex-col">
        <span className="font-bold text-[#2C2A51] wrap-anywhere">
          {user?.username === order.sellerUsername
            ? order.buyerUsername
            : order.sellerUsername}
        </span>
        <span className="text-[#5A5781] truncate wrap-anywhere">
          {order.chathistory[order.chathistory.length - 1].message}
        </span>
        <span
          className={`${read ? "text-[#2C2A51]" : "text-[#658EFF]"} text-sm`}
        >
          {formatTimeAgo(order.chathistory[order.chathistory.length - 1].time)}
        </span>
      </div>
    </div>
  );
}

export default MessageCard;
