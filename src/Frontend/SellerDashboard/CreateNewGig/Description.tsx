import defaultImageIcon from "../../assets/image-regular-icon.svg";
import me from "../../assets/me.jpeg";
import removeImageicon from "../../assets/x-icon.svg";
import { useState, useRef } from "react";
import checkIcon from "../../assets/circle-check-req-icon.svg";
import infoIcon from "../../assets/info-icon.svg";
import type { Gig as NewGig } from "../../types/Gig";

type DescriptionProps = {
  setDescription: (description: string) => void;
  newGig: NewGig;
  primaryImagePreview: string;
  setPrimaryImagePreview: (url: string) => void;
  secondaryImagePreview: string;
  setSecondaryImagePreview: (url: string) => void;
  ternaryImagePreview: string;
  setTernaryImagePreview: (url: string) => void;
};

function Description({
  setDescription,
  newGig,
  primaryImagePreview,
  setPrimaryImagePreview,
  secondaryImagePreview,
  setSecondaryImagePreview,
  ternaryImagePreview,
  setTernaryImagePreview,
}: DescriptionProps) {
  const primaryImageRef = useRef<HTMLInputElement>(null);
  const secondaryImageRef = useRef<HTMLInputElement>(null);
  const ternaryImageRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-4xl">Description</h2>
        <p className="text-[#464555] text-xl ">
          Give clients a clear picture of what they’ll receive.
        </p>
      </div>
      <div className="md:flex grid grid-cols-1 md:w-screen gap-6 justify-center">
        <div className="flex flex-col gap-6 md:w-[50vw]">
          <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold">Showcase Your Work</h3>
              <p>
                Add high-quality images to build trust with potential clients.
              </p>
            </div>
            <div className="md:flex grid grid-cols-1 gap-6">
              <div className="flex relative flex-col items-center justify-center border-dashed h-100 w-full border-2 rounded-lg md:w-2/3 border-[#C7C4D8]">
                {primaryImagePreview && (
                  <img
                    src={removeImageicon}
                    className="bg-transparent rounded-full right-3 contrast-100 invert-50 h-5 w-5 shadow-md absolute z-10 top-3 ml-auto cursor-pointer"
                    onClick={() => setPrimaryImagePreview("")}
                  />
                )}
                <img
                  src={
                    primaryImagePreview ? primaryImagePreview : defaultImageIcon
                  }
                  className={`${primaryImagePreview ? "h-full w-full" : "h-14 w-14"}`}
                />
                {!primaryImagePreview && (
                  <span className="text-[#131B2E]">Primary Showcase Image</span>
                )}
                <input
                  type="file"
                  ref={primaryImageRef}
                  id="SetImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPrimaryImagePreview(url);
                    }
                  }}
                />
                <label
                  htmlFor="SetImage"
                  className="text-[#464555] cursor-pointer"
                >
                  {!primaryImagePreview && "Click to browse"}
                </label>
              </div>
              <div className="flex gap-6 flex-col h-100  md:w-1/3 w-full">
                <div
                  className={` ${secondaryImagePreview ? "relative" : "flex flex-col"} border-dashed items-center justify-center border-2 rounded-lg h-47 w-full border-[#C7C4D8]`}
                >
                  {secondaryImagePreview && (
                    <img
                      src={removeImageicon}
                      className="bg-transparent rounded-full right-3 contrast-100 invert-50 h-5 w-5 shadow-md absolute z-10 top-3 ml-auto cursor-pointer"
                      onClick={() => setSecondaryImagePreview("")}
                    />
                  )}
                  <img
                    src={
                      secondaryImagePreview
                        ? secondaryImagePreview
                        : defaultImageIcon
                    }
                    className={`${secondaryImagePreview ? "h-full w-full" : "h-7 w-7"}`}
                  />
                  <input
                    type="file"
                    ref={secondaryImageRef}
                    id="SetSecondaryImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setSecondaryImagePreview(url);
                      }
                    }}
                  />
                  <label
                    htmlFor="SetSecondaryImage"
                    className="text-[#464555] ld:text-base text-sm cursor-pointer"
                  >
                    {!secondaryImagePreview && "Click to browse"}
                  </label>
                </div>

                <div
                  className={` ${ternaryImagePreview ? "relative" : "flex flex-col"} border-dashed items-center justify-center border-2 rounded-lg h-47 w-full border-[#C7C4D8]`}
                >
                  {ternaryImagePreview && (
                    <img
                      src={removeImageicon}
                      className="bg-transparent rounded-full right-3 contrast-100 invert-50 h-5 w-5 shadow-md absolute z-10 top-3 ml-auto cursor-pointer"
                      onClick={() => setTernaryImagePreview("")}
                    />
                  )}
                  <img
                    src={
                      ternaryImagePreview
                        ? ternaryImagePreview
                        : defaultImageIcon
                    }
                    className={`${ternaryImagePreview ? "h-full w-full" : "h-7 w-7"}`}
                  />
                  <input
                    type="file"
                    ref={ternaryImageRef}
                    id="SetTernaryImage"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setTernaryImagePreview(url);
                      }
                    }}
                  />
                  <label
                    htmlFor="SetTernaryImage"
                    className="text-[#464555] ld:text-base text-sm cursor-pointer"
                  >
                    {!ternaryImagePreview && "Click to browse"}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-2 text-[#3525CD] border-[#C7C4D8]/10 bg-[#C3C0FF]/10 p-6 rounded-2xl">
            <div className="md:text-base text-sm flex flex-col gap-6">
              <span className="text-xl flex gap-3 items-center">
                <img src={infoIcon} className="w-7 h-7" />
                Image Requirements
              </span>
              <ul className=" flex flex-col gap-3 px-9">
                <li>
                  <span className="flex gap-2 font-bold items-center">
                    <img src={checkIcon} className="w-5 h-5" /> No Nudity
                  </span>
                  <ul>
                    <li>
                      - Images must not contain explicit nudity or sexually
                      explicit content.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="flex gap-2 font-bold items-center">
                    <img src={checkIcon} className="w-5 h-5" />
                    No Offensive or Abusive Content
                  </span>
                  <ul>
                    <li>
                      - Images must not contain offensive symbols, harassment,
                      or abusive material.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="flex font-bold gap-2 items-center">
                    <img src={checkIcon} className="w-5 h-5" />
                    No Graphic Violence
                  </span>
                  <ul>
                    <li>
                      - Images must not include graphic or disturbing violent
                      content.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold">Describe Your Work</h3>
              <p>
                Present your work clearly to showcase expertise and build client
                trust.
              </p>
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              className="text-[#6B7280] w-full p-6 rounded-lg border resize-none border-[#C7C4D8]"
              value={newGig.description}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:w-[20vw]">
          <div className="flex flex-col p-6 rounded-2xl gap-6 shadow-md bg-white border border-[#C7C4D8] text-[#DAD7FF]">
            <span className="text-[#131B2E] font-semibold">
              Quality Checklist
            </span>
            <ul className="text-[#464555] flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white shrink-0 border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
                />
                Lighting is bright and natural
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white shrink-0 border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
                />
                Text in images is readable
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white shrink-0 border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
                />
                Showcases actual work, not stock photos
              </li>
            </ul>
          </div>
          <div className="flex flex-col shadow-md bg-white rounded-2xl border-[#C7C4D8] border">
            <div className="relative">
              <img
                src={
                  primaryImagePreview ? primaryImagePreview : defaultImageIcon
                }
                className={`h-50 rounded-t-2xl w-full`}
              />
              <h3 className="absolute text-xl bg-neutral-300/80 w-full text-[#ffffff] z-10 px-6 py-1 bottom-0">
                Preview
              </h3>
            </div>
            <div className="flex flex-col p-6 gap-3 text-[#131B2E]">
              <div className="flex gap-3 items-center">
                <img src={me} className="rounded-full h-8 w-8" />
                <span>Johan Kronholm</span>
              </div>
              <p className="text-xl">{newGig.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
