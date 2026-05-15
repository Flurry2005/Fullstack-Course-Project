import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { SocketContextType, OnlineList } from "../types/Socket";
import { getSocket } from "../socket/Socket";
import { useOrders } from "./useOrders";
import type { Order } from "../types/Order";
import { useAuth } from "./useAuth";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import type { ObjectId } from "mongodb";
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [onlineList, setOnlineList] = useState<OnlineList | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { orders, updateOrders, setOrders } = useOrders();
  const ordersRef = useRef(orders);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const audioRef = useRef(new Audio("/message_sound.mp3"));
  const popupMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const createMessagePopup = (
    username: string,
    message: string,
    orderId: ObjectId,
  ) => {
    if (window.location.pathname === "/messages") return;
    if (popupMessageRef.current) popupMessageRef.current.remove();
    popupMessageRef.current = document.createElement("div");
    document.body.appendChild(popupMessageRef.current);
    console.log(username, message, orderId);

    const checker = setInterval(() => {
      if (window.location.pathname === "/messages")
        popupMessageRef.current?.remove();
    }, 200);
    setTimeout(() => {
      popupMessageRef.current!.remove();
      clearInterval(checker);
    }, 5_000);

    const root = createRoot(popupMessageRef.current);
    const order = ordersRef.current?.find((order) => order._id === orderId);
    root.render(
      <div
        className="right-5 bottom-5 z-100 fixed flex flex-col justify-center gap-1 bg-[#DDD9FF]/90 shadow-lg px-5 rounded-2xl rounded-br-none w-100 h-25 transition-transform animate-[slideIn_0.3s_ease-out] cursor-pointer"
        onClick={async () => {
          navigate("/messages");
          console.log(ordersRef.current);
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
          setActiveOrder((prev) => {
            if (!order) {
              console.log(order);
              return prev;
            }

            return order;
          });
          popupMessageRef.current!.remove();
        }}
      >
        <div className="flex items-center gap-2">
          <p className="font-bold text-[#4338CA]">{username} -</p>
          <p className="truncate">{order?.gigname}</p>
          <p className="top-3 right-5 absolute text-xs">Sent you a message!</p>
        </div>

        <p className="max-w-9/10 truncate">{message}</p>
        <span className="right-2 bottom-2 absolute self-center font-black text-black">
          <i className="fa-arrow-right shadow-2xl fa-solid"></i>
        </span>
      </div>,
    );
  };

  const createPurchaseReceivedPopup = (
    buyerUsername: string,
    gigname: string,
    tier: string,
  ) => {
    if (popupMessageRef.current) popupMessageRef.current.remove();
    popupMessageRef.current = document.createElement("div");
    document.body.appendChild(popupMessageRef.current);

    setTimeout(() => {
      popupMessageRef.current!.remove();
    }, 5_000);

    const root = createRoot(popupMessageRef.current);
    root.render(
      <div className="right-5 bottom-5 z-100 fixed flex flex-col justify-center gap-1 bg-green-200/90 shadow-lg px-5 rounded-2xl rounded-br-none w-100 h-25 animate-[slideIn_0.3s_ease-out] cursor-pointer">
        <div className="flex items-center gap-2">
          <p className="font-bold text-[#4338CA]">{buyerUsername} -</p>
          <p className="truncate">{gigname}</p>
          <p className="top-3 right-5 absolute text-xs">
            Purchased your {tier} package!
          </p>
        </div>

        <p className="max-w-9/10 truncate">You have got a new purchase!</p>
        <span className="right-2 bottom-2 absolute self-center font-black text-black">
          <i className="fa-arrow-right shadow-2xl fa-solid"></i>
        </span>
      </div>,
    );
  };

  const updateUnreadMessagesCount = () => {
    if (user) {
      const unreadMessages = orders?.reduce((count, order) => {
        const unreadInOrder = order.chathistory.filter(
          (message) => !message.readBy.includes(user._id),
        ).length;

        return count + unreadInOrder;
      }, 0);
      if (unreadMessages === undefined) {
        return;
      }

      (orders?.forEach((order) =>
        order.chathistory
          .filter((message) => !message.readBy.includes(user._id))
          .forEach((d) => console.log(d)),
      ),
        setUnreadMessages(unreadMessages));
    }
  };

  useEffect(() => {
    updateUnreadMessagesCount();
  }, [orders]);

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = async (data: any) => {
      createMessagePopup(data.sender, data.message, data.orderId);
      if (activeOrder) {
        await getSocket().emitWithAck("read_chat", {
          orderId: activeOrder._id,
        });
        console.log("Wating");
      }
      await updateOrders();
      audioRef.current.play();
    };

    updateUnreadMessagesCount();

    const handleStatus = (data: OnlineList) => {
      setOnlineList((prev: OnlineList | null) => {
        if (!data) return prev;
        const updated = prev ? [...prev] : [];

        data.forEach((incoming) => {
          const index = updated.findIndex(
            (entry: any) => entry.username === incoming.username,
          );

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              status: incoming.status,
            };
          } else {
            updated.push({
              username: incoming.username,
              status: incoming.status,
            });
          }
        });

        return updated;
      });
    };

    const handlePurchaseReceived = (data: any) => {
      updateOrders();
      const { gigname, buyerUsername, tier } = data;
      createPurchaseReceivedPopup(buyerUsername, gigname, tier);
      audioRef.current.play();
    };

    const handleDisconnect = (reason: string) => {
      console.log("Disconnected from server", reason);
      logout();
    };

    socket.on("message_received", handleMessage);
    socket.on("online_status", handleStatus);
    socket.on("purchase_received", handlePurchaseReceived);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_failed", handleDisconnect);

    const requestStatus = () => {
      socket.emit("request_online_statuses");
    };

    socket.on("server_ready", requestStatus);

    return () => {
      socket.off("message_received", handleMessage);
      socket.off("online_status", handleStatus);
      socket.off("server_ready", requestStatus);
      socket.off("purchase_received", handlePurchaseReceived);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_failed", handleDisconnect);
    };
  }, [user, activeOrder]);

  return (
    <SocketContext.Provider
      value={{
        onlineList,
        setOnlineList,
        unreadMessages,
        setUnreadMessages,
        updateUnreadMessagesCount,
        activeOrder,
        setActiveOrder,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useOrders must be used within orderProvider");
  return context;
}
