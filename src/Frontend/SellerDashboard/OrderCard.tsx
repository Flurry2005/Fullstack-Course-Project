import me from "../assets/me.jpeg";
import StatusBadge from "./StatusBadge";

function OrderCard() {
  return (
    <>
      <div className="bg-white w-full flex flex-col gap-6 p-6 border-7 border-[#ACA8D7]/15 rounded-2xl">
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-3">
            <img
              className="w-16 h-16 rounded-full"
              src={me}
              alt="Picture of customer"
            ></img>
            <div className="flex flex-col">
              <span className="font-semibold text-[#2C2A51]">Johan Kronholm</span>
              <span className="text-[#5A5781]">Developer</span>
            </div>
          </div>
          <StatusBadge status={true} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#5A5781]">Due in</span>
          <div className="flex">
            <span className="text-2xl font-semibold">2 Days, 4h</span>
            <span className="ml-auto text-2xl text-[#0050D4]">$450.00</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
