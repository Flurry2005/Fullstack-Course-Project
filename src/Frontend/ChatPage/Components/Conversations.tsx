import React, { type Dispatch, type SetStateAction } from "react";
import { useOrder } from "../../Context/useOrders";
import me from "../../assets/me.jpeg";
import type { Order } from "../../types/Order";

interface Props {
  activeOrder: Order | null;
  setActiveOrder: Dispatch<SetStateAction<Order | null>>;
}

function Conversations({ setActiveOrder, activeOrder }: Props) {
  const { orders } = useOrder();

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
              onClick={() => {
                setActiveOrder(order);
              }}
            >
              <section className="flex flex-col justify-center px-4 py-2 w-fit h-full">
                <img
                  src={me}
                  alt=""
                  className="rounded-full w-fit h-8/10 object-contain aspect-square"
                />
                <span className="self-end bg-green-500 rounded-full w-2 h-2" />
              </section>
              <section className="flex flex-col gap-1 py-2 w-6/10">
                <p className="font-semibold text-[#4338CA]">
                  {order.seller.username}
                </p>
                <p className="text-[#818CF8] text-xs">{order.gigname}</p>
              </section>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Conversations;
