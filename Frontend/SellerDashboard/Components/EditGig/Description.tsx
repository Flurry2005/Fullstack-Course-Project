import { useEffect, useState } from "react";
import type { Gig } from "../../../types/Gig";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";

type DescriptionProps = {
  gig: Gig;
  setGig: React.Dispatch<React.SetStateAction<Gig | undefined>>;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

function Description({
  gig,
  setGig,
  setEditState,
  setConfirm,
}: DescriptionProps) {
  const [desc, setDesc] = useState(gig.description || "");
  const [everythingOK, setEverythingOK] = useState(true);
  const handleUpdate = () => {
    setGig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        description: desc,
      };
    });
    setEditState(false);
    setConfirm(true);
  };

  (useEffect(() => {
    if (desc.length < 12) {
      setEverythingOK(false);
    } else {
      setEverythingOK(true);
    }
  }),
    [desc]);
  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Describe Your Work</h3>
            <p>
              Present your work clearly to showcase expertise and build client
              trust.
            </p>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            className="p-6 focus:outline-none border border-[#C7C4D8]/15 rounded-lg w-full text-[#6B7280] resize-none"
            value={desc}
          />
        </div>
          <span className="flex flex-wrap gap-6 justify-center md:justify-between">
          <span onClick={() => setEditState(false)}>
            <CancelButton />
          </span>
          <span
            className={`${everythingOK ? "opacity-100" : "opacity-50"}`}
            onClick={everythingOK ? handleUpdate : () => {}}
          >
            <UpdateButton text={"Update"} />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Description;
