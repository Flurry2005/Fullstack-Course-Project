import { type Dispatch, type SetStateAction } from "react";
import { useOrders } from "../../Context/useOrders";
import me from "../../assets/me.jpeg";
import type { Order } from "../../types/Order";
import { useAuth } from "../../Context/useAuth";
import type { OnlineList } from "../../types/Socket";
import { getSocket } from "../../socket/Socket";

interface Props {
  activeOrder: Order | null;
  onlineList: OnlineList;
  setActiveOrder: Dispatch<SetStateAction<Order | null>>;
}

function Conversations({ setActiveOrder, activeOrder, onlineList }: Props) {
  const { orders, setOrders } = useOrders();
  const { user } = useAuth();

  return (
    <section className="bg-[#F8FAFC] border-r-[#E2E8F0] w-3/10 h-screen">
      <div className="flex flex-col justify-around p-5 h-2/10">
        <div>
          <p className="text-[#4338CA] text-2xl">Conversations</p>
          <p className="text-[#64748B]">Direct Messages</p>
        </div>
        <button className="bg-[#4F46E5] px-5 py-3 rounded-2xl w-full text-white cursor-pointer">
          + New Messages
        </button>
      </div>
      <div className="flex flex-col justify-start items-center px-5 h-8/10 overflow-y-scroll">
        {orders?.map((order) => {
          return (
            <article
              className={`flex gap-2 rounded-2xl border-[#F8FAFC] w-full box-content border h-22 ${activeOrder ? (activeOrder._id === order._id ? "bg-white border-[#E0E7FF]!" : "") : ""}`}
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
              <section className="flex flex-col justify-center px-4 py-2 w-fit h-full">
                <img
                  src={me}
                  alt=""
                  className="rounded-full w-fit h-8/10 object-contain aspect-square"
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
                <p className="text-[#818CF8] text-xs">{order.gigname}</p>
                <div className="flex items-center gap-1">
                  <p className="max-w-9/10 overflow-x-hidden text-[#64748B] text-xs truncate text-nowrap">
                    {order.chathistory.at(order.chathistory.length - 1)
                      ?.message || " "}
                  </p>
                  {user &&
                    !order.chathistory
                      .at(order.chathistory.length - 1)
                      ?.readBy.includes(user?._id) &&
                    order.chathistory.length > 0 && (
                      <span className="bg-blue-500 rounded-full w-2 h-2" />
                    )}
                </div>
              </section>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Conversations;
