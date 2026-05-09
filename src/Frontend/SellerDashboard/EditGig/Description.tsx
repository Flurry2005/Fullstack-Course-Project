import { useState } from "react";
import type { Gig } from "../../types/Gig";

type DescriptionProps = {
  gig: Gig;
};
function Description({ gig }: DescriptionProps) {
  const [desc, setDesc] = useState(gig.description || "");
  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
             <h3 className="text-xl font-bold">Describe Your Work</h3>
              <p>
                Present your work clearly to showcase expertise and build client
                trust.
              </p>
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={10}
              className="text-[#6B7280] w-full p-6 rounded-lg border resize-none border-[#C7C4D8]"
              value={desc}
            />
        </div>
      </div>
    </div>
  );
}

export default Description;
