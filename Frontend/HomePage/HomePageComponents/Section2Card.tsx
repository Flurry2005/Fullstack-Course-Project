import React from "react";

type CraftCardProps = {
  title: string;
  icon: React.ReactNode;
};

function Section2Card({ title, icon }: CraftCardProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-[0_0_0_1px_rgba(35,35,91,0.04)] hover:shadow-md p-6 sm:p-6 md:p-8 rounded-[22px] h-auto sm:h-44 md:h-48 transition hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-center items-center bg-[#efe9ff] mb-4 sm:mb-5 rounded-2xl w-12 sm:w-14 h-12 sm:h-14 text-[#2563eb] text-lg sm:text-xl">
        {icon}
      </div>

      <p className="font-medium text-[#23235b] text-lg sm:text-xl md:text-2xl text-center leading-snug">
        {title}
      </p>
    </div>
  );
}

export default Section2Card;
