import me from "../assets/me.jpeg";

type MessageCardProps = {
  read : boolean
}

function MessageCard( { read } : MessageCardProps) {
  return (
    <div className={`flex ${read ? "" : "bg-white"} rounded-2xl  p-3 gap-3`}>
      {" "}
      <img
        className="w-18 h-18 rounded-full"
        src={me}
        alt="Picture of profile"
      ></img>
      <div className="flex flex-col">
        <span className="font-bold text-[#2C2A51] wrap-anywhere">
          Johan Kronholm
        </span>
        <span className="text-[#5A5781] wrap-anywhere">
          Lorem ipsum dolor sit amet consectetur.....
        </span>
        <span className={`${read ? "text-[#2C2A51]" : "text-[#658EFF]"} text-sm`}>
          12m ago
        </span>
      </div>
    </div>
  );
}

export default MessageCard;
