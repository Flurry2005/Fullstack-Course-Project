import { useEffect, useState } from "react";
import type { Gig } from "../types/Gig";

interface QueueCardProps {
  gig: Gig;
}

function QueueCard({ gig }: QueueCardProps) {
  return (
    <div className="w-full">
      <div
        key={gig.sellerUsername}
        className="flex bg-[#F3EEFF] shadow-xl mb-3 p-4 rounded-xl w-full"
      >
        <img
          className="p-3 rounded-2xl w-25 h-25"
          src={gig.primaryImagePreview}
          alt="Häst"
        />

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <p className="mt-2 font-medium text-xl">{gig.title}</p>

            <span className="bg-[#DCC9FF] px-2 py-1 rounded-md text-gray-600 text-sm">
              {gig.category?.sub}
            </span>
          </div>

          <p className="mt-2 text-sm">
            Created by:{" "}
            <span className="text-blue-400 cursor-pointer">
              {gig.sellerUsername}
            </span>
          </p>

          <p className="mt-2 text-sm">{gig.description}</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 ml-5">
          <button className="bg-blue-400 px-4 py-2 rounded-lg w-full font-medium text-white text-sm cursor-pointer">
            Approve
          </button>

          <button className="bg-blue-400 px-4 py-2 rounded-lg w-full font-medium text-white text-sm cursor-pointer">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default QueueCard;
