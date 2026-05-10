import defaultImageIcon from "../../assets/image-regular-icon.svg";
import me from "../../assets/me.jpeg";
import removeImageicon from "../../assets/x-icon.svg";
import { useState, useRef } from "react";
import checkIcon from "../../assets/circle-check-req-icon.svg";
import infoIcon from "../../assets/info-icon.svg";
import type { Gig as NewGig } from "../../types/Gig";
import { useAuth } from "../../Context/useAuth";

type DescriptionProps = {
  setDescription: (description: string) => void;
  newGig: NewGig;
  primaryImagePreview: File | null;
  setPrimaryImagePreview: (file: File | null) => void;
  secondaryImagePreview: File | null;
  setSecondaryImagePreview: (file: File | null) => void;
  ternaryImagePreview: File | null;
  setTernaryImagePreview: (file: File | null) => void;
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

  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-4xl">Description</h2>
        <p className="text-[#464555] text-xl">
          Give clients a clear picture of what they’ll receive.
        </p>
      </div>
      <div className="md:flex justify-center gap-6 grid grid-cols-1 md:w-screen">
        <div className="flex flex-col gap-6 md:w-[50vw]">
          <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-xl">Showcase Your Work</h3>
              <p>
                Add high-quality images to build trust with potential clients.
              </p>
            </div>
            <div className="md:flex gap-6 grid grid-cols-1">
              <div className="relative flex flex-col justify-center items-center border-[#C7C4D8] border-2 border-dashed rounded-lg w-full md:w-2/3 h-100">
                {primaryImagePreview && (
                  <img
                    src={removeImageicon}
                    className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                    onClick={() => setPrimaryImagePreview(null)}
                  />
                )}
                <img
                  src={
                    primaryImagePreview
                      ? URL.createObjectURL(primaryImagePreview)
                      : defaultImageIcon
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
                      setPrimaryImagePreview(file);
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
              <div className="flex flex-col gap-6 w-full md:w-1/3 h-100">
                <div
                  className={` ${secondaryImagePreview ? "relative" : "flex flex-col"} border-dashed items-center justify-center border-2 rounded-lg h-47 w-full border-[#C7C4D8]`}
                >
                  {secondaryImagePreview && (
                    <img
                      src={removeImageicon}
                      className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                      onClick={() => setSecondaryImagePreview(null)}
                    />
                  )}
                  <img
                    src={
                      secondaryImagePreview
                        ? URL.createObjectURL(secondaryImagePreview)
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
                        setSecondaryImagePreview(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="SetSecondaryImage"
                    className="text-[#464555] text-sm ld:text-base cursor-pointer"
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
                      className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                      onClick={() => setTernaryImagePreview(null)}
                    />
                  )}
                  <img
                    src={
                      ternaryImagePreview
                        ? URL.createObjectURL(ternaryImagePreview)
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
                        setTernaryImagePreview(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="SetTernaryImage"
                    className="text-[#464555] text-sm ld:text-base cursor-pointer"
                  >
                    {!ternaryImagePreview && "Click to browse"}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-[#C3C0FF]/10 p-6 border-[#C7C4D8]/10 border-2 rounded-2xl text-[#3525CD]">
            <div className="flex flex-col gap-6 text-sm md:text-base">
              <span className="flex items-center gap-3 text-xl">
                <img src={infoIcon} className="w-7 h-7" />
                Image Requirements
              </span>
              <ul className="flex flex-col gap-3 px-9">
                <li>
                  <span className="flex items-center gap-2 font-bold">
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
                  <span className="flex items-center gap-2 font-bold">
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
                  <span className="flex items-center gap-2 font-bold">
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

          <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-xl">Describe Your Work</h3>
              <p>
                Present your work clearly to showcase expertise and build client
                trust.
              </p>
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
              className="p-6 border border-[#C7C4D8] rounded-lg w-full text-[#6B7280] resize-none"
              value={newGig.description}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:w-[20vw]">
          <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl text-[#DAD7FF]">
            <span className="font-semibold text-[#131B2E]">
              Quality Checklist
            </span>
            <ul className="flex flex-col gap-3 text-[#464555]">
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white checked:bg-[#3323CC] border border-[#C7C4D8] w-4 h-4 appearance-none shrink-0"
                />
                Lighting is bright and natural
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white checked:bg-[#3323CC] border border-[#C7C4D8] w-4 h-4 appearance-none shrink-0"
                />
                Text in images is readable
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-white checked:bg-[#3323CC] border border-[#C7C4D8] w-4 h-4 appearance-none shrink-0"
                />
                Showcases actual work, not stock photos
              </li>
            </ul>
          </div>
          <div className="flex flex-col bg-white shadow-md border border-[#ACA8D7]/15 rounded-2xl h-fit">
            <div className="relative">
              <img
                src={
                  primaryImagePreview
                    ? URL.createObjectURL(primaryImagePreview)
                    : defaultImageIcon
                }
                className={`h-50 rounded-t-2xl w-full`}
              />
              <h3 className="bottom-0 z-10 absolute bg-neutral-300/80 px-6 py-1 w-full text-[#ffffff] text-xl">
                Preview
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-6 text-[#131B2E]">
              <div className="flex items-center gap-3">
                <img
                  src={me}
                  className="border-[#1857f7] border-2 rounded-full w-9 h-9 object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-[#2c2a51] text-sm">
                    {user?.username}
                  </span>
                  <span className="text-[#6f6f9a] text-xs">
                    {newGig.category?.main}
                  </span>
                </div>
              </div>
              <p className="min-h-18 text-[#2c2a51] text-lg leading-6 wrap-anywhere">
                {newGig.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
