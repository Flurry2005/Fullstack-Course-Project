import React from "react";
import type { Order, Message } from "../../types/Order";
import me from "../../assets/me.jpeg";
import InputField from "../../Components/General/InputField";
interface Props {
  activeOrder: Order | null;
}

function ChatPanel({ activeOrder }: Props) {
  if (!activeOrder) return <></>;
  return (
    <main className="flex flex-col bg-[#F9F5FF] w-7/10 h-full">
      <section className="flex gap-5 bg-white px-5 w-full h-20">
        <div className="relative flex items-center">
          <img src={me} alt="" className="rounded-full h-10" />
          <span className="right-0 bottom-4 box-content absolute bg-green-500 border-3 border-white rounded-full w-2 h-2" />
        </div>
        <div className="flex flex-col justify-center leading-4">
          <p className="font-semibold text-[#2C2A51]">
            {activeOrder.seller.username}
          </p>
          <p className="text-[#0050D4]">{activeOrder.gigname}</p>
        </div>
      </section>
      {/* Chat Section */}
      <section className="flex-1 px-20 py-5 overflow-y-auto">
        <div className="flex flex-col gap-10">
          {activeOrder.chathistory.map((message: Message) => (
            <p
              key={message.message}
              className={`p-5 rounded-2xl ${message.username === activeOrder.seller.username ? "self-start bg-[#DDD9FF] text-black rounded-bl-none" : "self-end bg-[#0050D4] text-white rounded-br-none"}`}
            >
              {message.message}
            </p>
          ))}
        </div>
      </section>
      {/* Type Section */}
      <section className="px-5 h-15 shrink-0">
        <InputField
          placeholder={`Type your message to ${activeOrder.seller.username}...`}
          additionalClasses="bg-[#DDD9FF]! w-full! border-0 h-12"
        />
      </section>
    </main>
  );
}

export default ChatPanel;
