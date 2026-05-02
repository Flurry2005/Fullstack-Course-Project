import { createContext, useContext, useEffect, useState } from "react";
import type { OnlineListContextType, OnlineList } from "../types/OnlineList";
import { getSocket } from "../socket/Socket";
import { useOrders } from "./useOrders";

const OnlineListContext = createContext<OnlineListContextType | undefined>(
  undefined,
);

export function OnlineListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [onlineList, setOnlineList] = useState<OnlineList | null>(null);
  const { updateOrders } = useOrders();

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = () => updateOrders();

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
  }, []);

  return (
    <OnlineListContext.Provider value={{ onlineList, setOnlineList }}>
      {children}
    </OnlineListContext.Provider>
  );
}
export function useOnlineList() {
  const context = useContext(OnlineListContext);
  if (!context) throw new Error("useOrders must be used within orderProvider");
  return context;
}
