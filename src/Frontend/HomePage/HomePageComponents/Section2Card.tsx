import React from "react";

type CraftCardProps = {
  title: string;
  icon: React.ReactNode;
};

function Section2Card({ title, icon }: CraftCardProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-[0_0_0_1px_rgba(35,35,91,0.04)] hover:shadow-md rounded-[22px] h-42.5 transition hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-center items-center bg-[#efe9ff] mb-5 rounded-2xl w-14 h-14 text-[#2563eb] text-xl">
        {icon}
      </div>

      <p className="font-medium text-[#23235b] text-[24px]">{title}</p>
    </div>
  );
}

export default Section2Card;
