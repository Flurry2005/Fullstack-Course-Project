import me from "../assets/me.jpeg";

function MessageCard() {
  return (
    <div className="flex bg-white rounded-2xl  p-3 gap-3">
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
        <span className="text-[#212027] wrap-anywhere">
          Lorem ipsum dolor sit amet consectetur.....
        </span>
        <span className="text-[#658EFF] text-sm">12m ago</span>
      </div>
    </div>
  );
}

export default MessageCard;
