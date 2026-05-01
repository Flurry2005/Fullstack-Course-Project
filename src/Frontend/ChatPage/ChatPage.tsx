import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Conversations from "./Components/Conversations";
import ChatPanel from "./Components/ChatPanel";
import type { Order } from "../types/Order";
import { getSocket } from "../socket/Socket";
import { useOrder } from "../Context/useOrders";

function ChatPage() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { orders, updateOrders } = useOrder();

  useEffect(() => {
    const socket = getSocket();

    socket.on("message_received", () => updateOrders());

    return () => {
      socket.removeListener("message_received");
    };
  }, []);

  useEffect(() => {
    if (!orders || !activeOrder) return;

    const match = orders.find((order) => order._id === activeOrder._id);

    if (match) {
      setActiveOrder(match);
    }
  }, [orders]);
  return (
    <>
      <NavBar />
      <main className="flex w-full h-[calc(100vh-4.5rem)]">
        <Conversations
          setActiveOrder={setActiveOrder}
          activeOrder={activeOrder}
        />
        <ChatPanel activeOrder={activeOrder} />
      </main>
      <Footer />
    </>
  );
}

export default ChatPage;
