import React from "react";

type CraftCardProps = {
  title: string;
  icon: React.ReactNode;
  text: string;
};

function Section4Card({ title, icon, text }: CraftCardProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-white hover:shadow-md p-5 sm:p-6 rounded-[22px] w-full md:w-1/2 lg:w-1/3 text-center transition hover:-translate-y-1">
      <div className="flex justify-center items-center mb-4 sm:mb-5 rounded-2xl w-12 sm:w-14 h-12 sm:h-14 text-[#2563eb] text-lg sm:text-xl">
        {icon}
      </div>

      <p className="font-medium text-[#23235b] text-lg sm:text-xl md:text-2xl">
        {title}
      </p>

      <p className="mt-2 text-[#4b4b6a] text-sm sm:text-base leading-relaxed">
        {text}
      </p>
    </div>
  );
}

export default Section4Card;
