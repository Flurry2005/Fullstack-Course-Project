import React, { type Dispatch, type SetStateAction } from "react";
import { useOrders } from "../../Context/useOrders";
import { useSocket } from "../../Context/useSocket";
import me from "../../assets/me.jpeg";
import { useAuth } from "../../Context/useAuth";

interface props {
  closeModal: () => void;
}

function NewMessageModal({ closeModal }: props) {
  const { orders } = useOrders();
  const { user } = useAuth();
  const { setActiveOrder, onlineList } = useSocket();

  if (!orders) return null;

  return (
    <dialog
      open
      className="z-200 fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-xs w-screen max-w-none h-screen max-h-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="relative flex flex-col gap-5 bg-white shadow-xl p-4 px-10 py-15 rounded-2xl w-8/10 h-9/10 overflow-y-hidden">
        <span
          className="top-5 right-5 absolute font-black text-black text-2xl cursor-pointer"
          onClick={closeModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="top-5 left-10 absolute font-black text-[#4338CA] text-2xl">
          SELECT A CHAT!
        </h2>
        <span className="block border-[#f0f0f0] border-b w-full h-1"></span>
        <div className="flex flex-col gap-3 px-5 py-5 rounded-2xl min-h-full overflow-y-scroll">
          {orders
            .filter((order) => order.chathistory.length === 0)
            .map((order) => (
              <div
                className="flex shadow-xl hover:shadow-[#4338CA]/40 rounded-2xl w-full transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setActiveOrder(order);
                  closeModal();
                }}
              >
                <section className="flex flex-col justify-center px-4 py-2 w-fit h-full">
                  <img
                    src={me}
                    alt=""
                    className="rounded-full w-20 h-fit object-contain aspect-square"
                  />
                  <span
                    className={`self-end rounded-full w-2 h-2 ${onlineList?.find((entry: any) => entry.username === (user?.username === order?.buyerUsername ? order?.sellerUsername : order?.buyerUsername) && entry.status === "Online") ? "bg-green-500" : "bg-red-500"}`}
                  />
                </section>
                <section className="flex flex-col gap-1 py-2 w-6/10">
                  <p className="font-semibold text-[#4338CA] truncate">
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
                  </div>
                </section>
              </div>
            ))}
        </div>
      </div>
    </dialog>
  );
}

export default NewMessageModal;
