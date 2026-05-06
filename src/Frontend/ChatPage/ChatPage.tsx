import { useEffect } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Conversations from "./Components/Conversations";
import ChatPanel from "./Components/ChatPanel";
import { useOrders } from "../Context/useOrders";
import { useSocket } from "../Context/useSocket";

function ChatPage() {
  const { onlineList, activeOrder, setActiveOrder } = useSocket();
  const { orders } = useOrders();

  useEffect(() => {
    if (!orders || !activeOrder) return;

    const match = orders.find((order) => order._id === activeOrder._id);

    if (match) {
      setActiveOrder(match);
    }

    return () => setActiveOrder(null);
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
