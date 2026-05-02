import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Conversations from "./Components/Conversations";
import ChatPanel from "./Components/ChatPanel";
import type { Order } from "../types/Order";
import { getSocket } from "../socket/Socket";
import { useOrders } from "../Context/useOrders";
import { useOnlineList } from "../Context/useOnlineList";

function ChatPage() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { onlineList } = useOnlineList();
  const { orders } = useOrders();

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
          onlineList={onlineList}
        />
        <ChatPanel activeOrder={activeOrder} onlineList={onlineList} />
      </main>
      <Footer />
    </>
  );
}

export default ChatPage;
