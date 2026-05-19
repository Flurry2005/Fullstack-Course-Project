import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { SocketContextType, OnlineList } from "../types/Socket";
import { getSocket } from "../socket/Socket";
import { useOrders } from "./useOrders";
import type { Order } from "../types/Order";
import { useAuth } from "./useAuth";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import type { ObjectId } from "mongodb";
import type { OrderStatus } from "../MyOrdersPage/MyOrders";
import {
  Check,
  CheckCircle,
  CircleCheck,
  Loader,
  Package,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";
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

  const statusConfig: Record<
    OrderStatus,
    {
      label: string;
      icon: React.ReactNode;
      bg: string;
      text: string;
      bar: string;
    }
  > = {
    "In Progress": {
      label: "In Progress",
      icon: <Loader size={11} />,
      bg: "bg-[#EEEDFE]",
      text: "text-[#534AB7]",
      bar: "bg-[#534AB7]",
    },
    "Confirmed By Seller": {
      label: "Confirmed",
      icon: <Check size={11} />,
      bg: "bg-[#E6F1FB]",
      text: "text-[#185FA5]",
      bar: "bg-[#185FA5]",
    },
    Revision: {
      label: "Revision",
      icon: <RefreshCw size={11} />,
      bg: "bg-[#FAEEDA]",
      text: "text-[#854F0B]",
      bar: "bg-[#BA7517]",
    },
    Completed: {
      label: "Completed",
      icon: <CircleCheck size={11} />,
      bg: "bg-[#EAF3DE]",
      text: "text-[#3B6D11]",
      bar: "bg-[#639922]",
    },
    Cancelled: {
      label: "Cancelled",
      icon: <XCircle size={11} />,
      bg: "bg-[#FCEBEB]",
      text: "text-[#A32D2D]",
      bar: "bg-[#E24B4A]",
    },
  };

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
        className="right-5 bottom-5 z-100 fixed flex flex-col bg-white shadow-lg border border-gray-100 rounded-2xl rounded-br-none w-100 h-25 overflow-hidden animate-[slideIn_0.3s_ease-out] cursor-pointer"
        onClick={async () => {
          navigate("/messages");
          await getSocket().emitWithAck("read_chat", { orderId: order!._id });
          setOrders((prev) => {
            if (!prev) return null;
            return prev.map((orderTemp) => {
              if (orderTemp._id !== order!._id) return orderTemp;
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
          setActiveOrder((prev) => (!order ? prev : order));
          popupMessageRef.current!.remove();
        }}
      >
        <div className="bg-[#534AB7] w-full h-1" />
        <div className="flex flex-col justify-center gap-1 px-5 py-3 h-full">
          <div className="flex items-center gap-2">
            <span className="bg-[#EEEDFE] px-2 py-0.5 rounded font-semibold text-[#534AB7] text-[10px] uppercase tracking-wider">
              {username}
            </span>
            <p className="text-[#6f6f9a] text-[13px] truncate">
              {order?.gigname}
            </p>
            <p className="top-3 right-5 absolute text-[#8a8a9a] text-[11px]">
              Sent you a message!
            </p>
          </div>
          <p className="font-medium text-[#2c2a51] text-[15px] truncate">
            <span className="font-normal text-[#6f6f9a]">{message}</span>
          </p>
        </div>
        <span className="right-3 bottom-3 absolute">
          <i className="fa-arrow-right text-[#8a8a9a] text-sm fa-solid"></i>
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
      <div
        className="right-5 bottom-5 z-100 fixed flex flex-col bg-white shadow-lg border border-gray-100 rounded-2xl rounded-br-none w-100 h-25 overflow-hidden animate-[slideIn_0.3s_ease-out] cursor-pointer"
        onClick={() => navigate("/orders")}
      >
        <div className="bg-[#534AB7] w-full h-1" />
        <div className="flex flex-col justify-center gap-1 px-5 py-3 h-full">
          <div className="flex items-center gap-2">
            <span className="bg-[#EAF3DE] px-2 py-0.5 rounded font-semibold text-[#534AB7] text-[10px] uppercase tracking-wider">
              New Order
            </span>
            <p className="text-[#6f6f9a] text-[13px] truncate">{gigname}</p>
            <p className="top-3 right-5 absolute text-[#8a8a9a] text-[11px]">
              {tier} package
            </p>
          </div>
          <p className="font-medium text-[#2c2a51] text-[15px] truncate">
            <span className="font-normal text-[#6f6f9a]">{buyerUsername}</span>{" "}
            purchased your service
          </p>
        </div>
        <span className="right-3 bottom-3 absolute">
          <i className="fa-arrow-right text-[#8a8a9a] text-sm fa-solid"></i>
        </span>
      </div>,
    );
  };

  const createOrderUpdatePopup = (
    username: string,
    deliveryStatus: string,
    orderName: string,
    seller: boolean,
  ) => {
    if (popupMessageRef.current) popupMessageRef.current.remove();
    popupMessageRef.current = document.createElement("div");
    document.body.appendChild(popupMessageRef.current);

    setTimeout(() => {
      popupMessageRef.current!.remove();
    }, 5_000);

    const root = createRoot(popupMessageRef.current);
    const status =
      statusConfig[deliveryStatus as OrderStatus] ??
      statusConfig["In Progress"];

    root.render(
      <div
        className="right-5 bottom-5 z-100 fixed flex flex-col bg-white shadow-lg border border-gray-100 rounded-2xl rounded-br-none w-100 h-25 overflow-hidden animate-[slideIn_0.3s_ease-out] cursor-pointer"
        onClick={() => {
          navigate("/orders");
        }}
      >
        <div className={`h-1 w-full ${status.bar}`} />
        <div className="flex flex-col justify-center gap-1 px-5 py-3 h-full">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
            <p className="text-[#6f6f9a] text-[13px] truncate">{orderName}</p>
            <p className="top-3 right-5 absolute text-[#8a8a9a] text-[11px]">
              Status updated
            </p>
          </div>
          <p className="font-medium text-[#2c2a51] text-[15px] truncate">
            <span className="font-normal text-[#6f6f9a]">
              {seller ? "Seller: " : "Buyer: "}
              {username}
            </span>{" "}
            updated this order
          </p>
        </div>
        <span className="right-3 bottom-3 absolute">
          <i className="fa-arrow-right text-[#8a8a9a] text-sm fa-solid"></i>
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
      console.log("Disconnected from server:", reason);
      if (
        reason === "transport close" ||
        reason === "transport error" ||
        reason === "ping timeout"
      ) {
        return;
      }

      if (reason === "io server disconnect") {
        logout();
      }
    };

    const handleReconnectFailed = () => {
      console.log("Reconnect failed");
      logout();
    };

    const handleOrderUpdate = (data: any) => {
      setOrders(
        (prev) =>
          prev?.map((order) =>
            order._id === data._id
              ? { ...order, delivered: data.delivered }
              : order,
          ) ?? null,
      );
      createOrderUpdatePopup(
        data.username,
        data.delivered,
        data.orderName,
        data.seller,
      );
    };

    socket.on("message_received", handleMessage);
    socket.on("online_status", handleStatus);
    socket.on("purchase_received", handlePurchaseReceived);
    socket.on("order_update", handleOrderUpdate);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_failed", handleReconnectFailed);

    const requestStatus = () => {
      socket.emit("request_online_statuses");
    };
    // Request online statuses when the server is ready
    socket.on("server_ready", requestStatus);

    return () => {
      socket.off("message_received", handleMessage);
      socket.off("online_status", handleStatus);
      socket.off("server_ready", requestStatus);
      socket.off("purchase_received", handlePurchaseReceived);
      socket.off("order_update", handleOrderUpdate);
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
