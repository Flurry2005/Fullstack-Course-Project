import { useEffect, useState } from "react";
import Footer from "../Footer";
import Conversations from "./Components/Conversations";
import ChatPanel from "./Components/ChatPanel";
import { useOrders } from "../Context/useOrders";
import { useSocket } from "../Context/useSocket";
import { useAuth } from "../Context/useAuth";
import { fetchProfile } from "../utils/GetProfile";
import NavBar from "../NavBar/NavBar";

function ChatPage() {
  const { onlineList, activeOrder, setActiveOrder } = useSocket();
  const { orders } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    if (!orders || !activeOrder) return;

    const match = orders.find((order) => order._id === activeOrder._id);

    if (match) {
      setActiveOrder(match);
    }

    return () => setActiveOrder(null);
  }, [orders]);

  const [profilePictures, setProfilePictures] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const loadPictures = async () => {
      if (!orders || !user) return;

      const uniqueUsers = [
        ...new Set(
          orders.map((order) =>
            order.sellerUsername === user.username
              ? order.buyerUsername
              : order.sellerUsername,
          ),
        ),
      ];

      const entries = await Promise.all(
        uniqueUsers.map(async (username) => {
          const profile = await fetchProfile(username);

          return [username, profile?.profilePictureUrl];
        }),
      );

      setProfilePictures(Object.fromEntries(entries));
    };

    loadPictures();
  }, [orders, user]);
  return (
    <>
      <NavBar />
      <main className="flex lg:flex-row flex-col w-full lg:h-[calc(100vh-4.5rem)]">
        <Conversations
          setActiveOrder={setActiveOrder}
          activeOrder={activeOrder}
          onlineList={onlineList}
          profilePictures={profilePictures}
        />
        <ChatPanel
          activeOrder={activeOrder}
          onlineList={onlineList}
          profilePictures={profilePictures}
        />
      </main>
      <Footer />
    </>
  );
}

export default ChatPage;
