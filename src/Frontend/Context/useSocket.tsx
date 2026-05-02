import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { SocketContextType, OnlineList } from "../types/Socket";
import { getSocket } from "../socket/Socket";
import { useOrders } from "./useOrders";
import type { Order } from "../types/Order";
import { useAuth } from "./useAuth";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [onlineList, setOnlineList] = useState<OnlineList | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { orders, updateOrders } = useOrders();
  const { user } = useAuth();
  const audioRef = useRef(new Audio("/message_sound.mp3"));

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

    const handleMessage = async () => {
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

    socket.on("message_received", handleMessage);
    socket.on("online_status", handleStatus);

    const requestStatus = () => {
      socket.emit("request_online_statuses");
    };

    socket.on("server_ready", requestStatus);

    return () => {
      socket.off("message_received", handleMessage);
      socket.off("online_status", handleStatus);
      socket.off("server_ready", requestStatus);
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
