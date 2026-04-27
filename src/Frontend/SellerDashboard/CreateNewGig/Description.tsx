import defaultImageIcon from "../../assets/image-regular-icon.svg";
import fish from "../../assets/fish.jpg";
import me from "../../assets/me.jpeg";

function Description() {
  return (
    <div className="flex w-screen gap-6 justify-center">
      <div className="flex flex-col gap-6 w-[50vw]">
        <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Showcase Your Work</h3>
            <p>
              Add high-quality images to build trust with potential clients.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center justify-center border-dashed h-100 border-2 rounded-lg w-2/3 border-[#C7C4D8]">
              <img src={defaultImageIcon} className="h-14 w-14" />
              <span className="text-[#131B2E]">Primary Showcase Image</span>
              <span className="text-[#464555]">Click to browse</span>
            </div>
            <div className="flex gap-6 flex-col h-100 w-1/3">
              <div className="flex border-dashed items-center justify-center border-2 rounded-lg h-50 w-full border-[#C7C4D8]">
                <img src={defaultImageIcon} className="h-7 w-7" />
              </div>
              <div className="flex border-dashed items-center justify-center border-2 rounded-lg h-50 w-full border-[#C7C4D8]">
                <img src={defaultImageIcon} className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Description</h3>
          </div>
        </div>

        <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl"></div>
      </div>

      <div className="flex flex-col gap-6 w-[20vw]">
        <div className="flex flex-col p-6 rounded-2xl gap-6 shadow-md bg-white border border-[#C7C4D8] text-[#DAD7FF]">
          <span className="text-[#131B2E] font-semibold">
            Quality Checklist
          </span>
          <ul className="text-[#464555] flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <input
                type="checkbox"
                className="bg-white border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
              />
              Lighting is bright and natural
            </li>
            <li className="flex items-center gap-3">
              <input
                type="checkbox"
                className="bg-white border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
              />
              Text in images is readable
            </li>
            <li className="flex items-center gap-3">
              <input
                type="checkbox"
                className="bg-white border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
              />
              Showcases actual work, not stock photos
            </li>
          </ul>
        </div>
        <div className="flex flex-col shadow-md bg-white rounded-2xl border-[#C7C4D8] border">
          <div className="relative">
            <img
              src={fish}
              className="w-full h-fit border-t rounded-t-2xl border-transparent"
            />
            <h3 className="absolute text-xl text-white z-10 bottom-1 left-4 font-semibold">
              Preview Mode
            </h3>
          </div>
          <div className="flex flex-col p-6 gap-3 text-[#131B2E]">
            <div className="flex gap-3 items-center">
              <img src={me} className="rounded-full h-8 w-8" />
              <span>Johan Kronholm</span>
            </div>
            <p className="text-xl">
              I will teach you how to fish and master bait
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
