import React, { useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Conversations from "./Components/Conversations";
import ChatPanel from "./Components/ChatPanel";
import type { Order } from "../types/Order";

function ChatPage() {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

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
