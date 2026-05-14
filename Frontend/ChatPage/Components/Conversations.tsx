import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useOrders } from "../../Context/useOrders";
import me from "../../assets/me.jpeg";
import type { Order } from "../../types/Order";
import { useAuth } from "../../Context/useAuth";
import type { OnlineList } from "../../types/Socket";
import { getSocket } from "../../socket/Socket";
import NewMessageModal from "./NewMessageModal";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  activeOrder: Order | null;
  onlineList: OnlineList;
  setActiveOrder: Dispatch<SetStateAction<Order | null>>;
  profilePictures: Record<string, string>;
}

function Conversations({
  setActiveOrder,
  activeOrder,
  onlineList,
  profilePictures,
}: Props) {
  const { orders, setOrders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [buyerMode, setBuyerMode] = useState(
    searchParams.get("mode") === "buyer" || !searchParams.get("mode"),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section className="bg-[#F8FAFC] not-lg:pb-5 not-lg:border-gray-200 border-r-[#E2E8F0] not-lg:border-b w-2/10 not-lg:w-full h-full not-lg:h-fit">
      <div className="flex flex-col justify-around not-2xl:gap-2 p-5 h-2/10 min-h-fit">
        <div className="flex not-2xl:flex-col not-lg:flex-row! justify-between items-center not-2xl:gap-2">
          <div>
            <p className="text-[#4338CA] text-2xl">Conversations</p>
            <p className="text-[#64748B]">Direct Messages</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold text-[#4338CA]">CHAT MODE</p>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!buyerMode}
                onChange={() => {
                  setBuyerMode((prev) => !prev);
                  navigate(`?mode=${!buyerMode ? "buyer" : "seller"}`);
                }}
              />

              <div className="bg-gray-300 peer-checked:bg-[#4338CA] rounded-full w-32 h-9 transition-colors duration-300"></div>

              <div className="top-1 left-1 absolute flex justify-center justify-items-center items-center bg-white shadow-md rounded-full w-14 h-7 font-bold text-xs text-center transition-transform peer-checked:translate-x-16 duration-300">
                {buyerMode ? "BUYER" : "SELLER"}
              </div>
            </label>
          </div>
        </div>
        <button
          onClick={toggleModal}
          className="bg-[#4F46E5] px-5 py-3 rounded-2xl w-full text-white text-xs md:text-sm cursor-pointer"
        >
          + New Messages
        </button>
      </div>
      <div className="flex flex-col justify-start items-center px-5 h-8/10 overflow-x-hidden overflow-y-scroll">
        <p className="mb-1 font-semibold text-[#8e50b3] text-sm text-center">
          {buyerMode ? "CHATTING AS CUSTOMER" : "CHATTING AS SELLER"}
        </p>
        <span className="mb-2 border-gray-200 border-b w-full h-1"></span>
        {orders
          ?.filter((order) => order.chathistory.length > 0)
          .filter((order) =>
            buyerMode
              ? order.buyerUsername === user?.username
              : order.sellerUsername === user?.username,
          )
          .map((order) => {
            return (
              <article
                className={`flex gap-2 rounded-2xl cursor-pointer border-[#F8FAFC] w-full justify-between box-content border h-22 ${activeOrder ? (activeOrder._id === order._id ? "bg-white border-[#E0E7FF]!" : "") : ""}`}
                key={order._id}
                onClick={async () => {
                  setActiveOrder(order);
                  await getSocket().emitWithAck("read_chat", {
                    orderId: order._id,
                  });
                  setOrders((prev) => {
                    if (!prev || !user) return prev;

                    return prev.map((order1) =>
                      order1._id === order._id
                        ? {
                            ...order1,
                            chathistory: order1.chathistory.map((m) => ({
                              ...m,
                              readBy: [...m.readBy, user._id],
                            })),
                          }
                        : order1,
                    );
                  });
                }}
              >
                <div className="flex w-9/10">
                  <section className="flex flex-col justify-center px-4 py-2 w-fit h-full">
                    <img
                      src={
                        order.buyerUsername === user?.username
                          ? profilePictures[order.sellerUsername]
                          : profilePictures[order.buyerUsername]
                      }
                      alt=""
                      className="rounded-full w-13 h-auto object-contain aspect-square"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
                      }}
                    />
                    <span
                      className={`self-end rounded-full w-2 h-2 ${onlineList?.find((entry: any) => entry.username === (user?.username === order?.buyerUsername ? order?.sellerUsername : order?.buyerUsername) && entry.status === "Online") ? "bg-green-500" : "bg-red-500"}`}
                    />
                  </section>
                  <section className="flex flex-col gap-1 py-2 w-6/10">
                    <p className="font-semibold text-[#4338CA]">
                      {user?.username === order.buyerUsername
                        ? order.sellerUsername
                        : order.buyerUsername}
                    </p>
                    <p className="text-[#818CF8] text-xs truncate">
                      {order.gigname}
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="max-w-9/10 overflow-x-hidden text-[#64748B] text-xs truncate text-nowrap">
                        {order.chathistory.at(order.chathistory.length - 1)
                          ?.message || " "}
                      </p>
                    </div>
                  </section>
                </div>
                {user &&
                  !order.chathistory
                    .at(order.chathistory.length - 1)
                    ?.readBy.includes(user?._id) &&
                  order.chathistory.length > 0 && (
                    <span className="self-center bg-blue-500 mr-2 rounded-full w-3 h-3 animate-pulse" />
                  )}
              </article>
            );
          })}
      </div>

      {isModalOpen && (
        <NewMessageModal
          closeModal={toggleModal}
          profilePictures={profilePictures}
        />
      )}
    </section>
  );
}

export default Conversations;
