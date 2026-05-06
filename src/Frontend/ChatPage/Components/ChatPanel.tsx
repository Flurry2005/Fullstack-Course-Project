import { useEffect, useRef, useState } from "react";
import type { Order, Message } from "../../types/Order";
import me from "../../assets/me.jpeg";
import InputField from "../../Components/General/InputField";
import { getSocket } from "../../socket/Socket";
import { useOrders } from "../../Context/useOrders";
import { useAuth } from "../../Context/useAuth";
import type { OnlineList } from "../../types/Socket";
interface Props {
  activeOrder: Order | null;
  onlineList: OnlineList;
}

function ChatPanel({ activeOrder, onlineList }: Props) {
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

  if (!activeOrder || !user) return <></>;
  return (
    <main className="flex flex-col bg-[#F9F5FF] w-7/10 h-full">
      <section className="flex gap-5 bg-white px-5 w-full h-20">
        <div className="relative flex items-center">
          <img src={me} alt="" className="rounded-full h-10" />
          <span
            className={`right-0 bottom-4 box-content absolute border-3 border-white rounded-full w-2 h-2 ${onlineList?.find((entry: any) => entry.username === (user?.username === activeOrder?.buyerUsername ? activeOrder?.sellerUsername : activeOrder?.buyerUsername) && entry.status === "Online") ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
        <div className="flex flex-col justify-center leading-4">
          <p className="font-semibold text-[#2C2A51]">
            {user?.username === activeOrder.buyerUsername
              ? activeOrder.sellerUsername
              : activeOrder.buyerUsername}
          </p>
          <p className="text-[#0050D4]">{activeOrder.gigname}</p>
        </div>
      </section>
      {/* Chat Section */}
      <section ref={chatRef} className="flex-1 px-20 py-5 overflow-y-auto">
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
