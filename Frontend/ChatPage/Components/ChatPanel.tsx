import { useEffect, useRef, useState } from "react";
import type { Order, Message } from "../../types/Order";
import me from "../../assets/me.jpeg";
import InputField from "../../Components/General/InputField";
import { getSocket } from "../../socket/Socket";
import { useOrders } from "../../Context/useOrders";
import { useAuth } from "../../Context/useAuth";
import type { OnlineList } from "../../types/Socket";
import { useNavigate } from "react-router-dom";

interface Props {
  activeOrder: Order | null;
  onlineList: OnlineList;
  profilePictures: Record<string, string>;
}

function ChatPanel({ activeOrder, onlineList, profilePictures }: Props) {
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const chatRef = useRef<HTMLDivElement | null>(null);
  const { orders, updateOrders } = useOrders();

  const sendMessage = (message: string) => {
    if (!user) return;
    const socket = getSocket();
    socket.emit("send_message", {
      orderId: activeOrder?._id,
      message: message,
    });
    setMessage("");
    updateOrders();
  };

  const formatMessageTime = (input: string | Date) => {
    const date = new Date(input);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Today ${time}`;
    if (isYesterday) return `Yesterday ${time}`;

    return `${date.toLocaleDateString()} ${time}`;
  };

  useEffect(() => {
    if (!chatRef.current) return;

    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [activeOrder?.chathistory]);

  const navigate = useNavigate();

  if (!activeOrder || !user) return <></>;
  return (
    <main className="flex flex-col bg-[#F9F5FF] w-8/10 not-lg:w-full h-full not-lg:min-h-[calc(100vh-4.5rem)] not-lg:max-h-[calc(100vh-4.5rem)]">
      <section className="flex gap-5 bg-white px-5 not-lg:px-3 py-2 w-full h-20 not-lg:h-20">
        <div className="relative flex items-center">
          <img
            src={
              activeOrder.buyerUsername === user?.username
                ? profilePictures[activeOrder.sellerUsername]
                : profilePictures[activeOrder.buyerUsername]
            }
            alt=""
            className="rounded-full w-10 h-auto object-contain aspect-square"
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
          />
          <span
            className={`right-0 bottom-1 box-content absolute border-3 border-white rounded-full w-2 h-2 ${onlineList?.find((entry: any) => entry.username === (user?.username === activeOrder?.buyerUsername ? activeOrder?.sellerUsername : activeOrder?.buyerUsername) && entry.status === "Online") ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <div className="flex flex-col justify-center leading-4">
          <p
            className="font-semibold text-[#2C2A51] cursor-pointer"
            onClick={() =>
              navigate(
                `/profile/${user?.username === activeOrder.buyerUsername ? activeOrder.sellerUsername : activeOrder.buyerUsername}`,
              )
            }
          >
            {user?.username === activeOrder.buyerUsername
              ? activeOrder.sellerUsername
              : activeOrder.buyerUsername}
          </p>
          <p className="not-lg:max-w-9/10 text-[#0050D4] text-xs truncate">
            {activeOrder.gigname}
          </p>
        </div>
      </section>
      {/* Chat Section */}
      <section
        ref={chatRef}
        className="px-20 not-md:px-5 py-5 h-screen overflow-y-auto"
      >
        <div className="flex flex-col gap-10">
          {activeOrder.chathistory && activeOrder.chathistory.length > 0 ? (
            activeOrder.chathistory.map((message: Message, index) => (
              <div key={index} className="flex flex-col w-full">
                <p
                  className={`p-5 w-fit rounded-2xl ${message.username !== user.username ? "self-start bg-[#DDD9FF] text-black rounded-bl-none" : "self-end bg-[#0050D4] text-white rounded-br-none"}`}
                >
                  {message.message}
                </p>
                <p
                  className={`${message.username !== user.username ? "self-start text-[#64748B] rounded-bl-none" : "self-end text-[#64748B] rounded-br-none"}`}
                >
                  {formatMessageTime(message.time)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[#64748B] text-center">
              New conversation, send a message to start the conversation!
            </p>
          )}
        </div>
      </section>
      {/* Type Section */}
      <section className="px-5 h-15 shrink-0">
        <InputField
          placeholder={`Type your message to ${activeOrder.sellerUsername}...`}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown="Enter"
          onKeyDownFunc={() => {
            sendMessage(message);
            console.log(message);
          }}
          additionalClasses="bg-[#DDD9FF]! w-full! border-0 h-12"
        />
      </section>
    </main>
  );
}

export default ChatPanel;
