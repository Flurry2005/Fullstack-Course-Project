import React, { useEffect, useRef, useState } from "react";
import type { Order, Message } from "../../types/Order";
import me from "../../assets/me.jpeg";
import InputField from "../../Components/General/InputField";
import { getSocket } from "../../socket/Socket";
import { useOrder } from "../../Context/useOrders";
import { useAuth } from "../../Context/useAuth";
interface Props {
  activeOrder: Order | null;
}

function ChatPanel({ activeOrder }: Props) {
  const [message, setMessage] = useState<string>("");
  const { user } = useAuth();

  const chatRef = useRef<HTMLDivElement | null>(null);
  const { updateOrders } = useOrder();

  const sendMessage = (message: string) => {
    const socket = getSocket();
    socket.emit("send_message", {
      orderId: activeOrder?._id,
      message: message,
    });
    setMessage("");
    updateOrders();
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
          <span className="right-0 bottom-4 box-content absolute bg-green-500 border-3 border-white rounded-full w-2 h-2" />
        </div>
        <div className="flex flex-col justify-center leading-4">
          <p className="font-semibold text-[#2C2A51]">
            {activeOrder.sellerUsername}
          </p>
          <p className="text-[#0050D4]">{activeOrder.gigname}</p>
        </div>
      </section>
      {/* Chat Section */}
      <section ref={chatRef} className="flex-1 px-20 py-5 overflow-y-auto">
        <div className="flex flex-col gap-10">
          {activeOrder.chathistory.map((message: Message) => (
            <p
              key={message.message}
              className={`p-5 rounded-2xl ${message.username !== user.username ? "self-start bg-[#DDD9FF] text-black rounded-bl-none" : "self-end bg-[#0050D4] text-white rounded-br-none"}`}
            >
              {message.message}
            </p>
          ))}
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
