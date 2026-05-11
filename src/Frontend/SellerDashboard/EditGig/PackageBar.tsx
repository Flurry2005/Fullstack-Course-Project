import type { Package } from "../../types/Gig";
import { useState, useRef, useEffect } from "react";
import checkIcon from "../../assets/circle-check-req-icon.svg";
import removeIcon from "../../assets/x-icon.svg";
import deleteIcon from "../../assets/delete-icon-white.svg";

import type { Gig } from "../../types/Gig";
type PackageBarProps = {
  plan: Package;
  name: string;
  editState: boolean;
  setGig: React.Dispatch<React.SetStateAction<Gig | undefined>>;
  setDelivery: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPrice: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  setFeatures: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  features: string[] | undefined;
  price: string | number | undefined;
  delivery: string | undefined;
  gig: Gig;
};

function PackageBar({
  plan,
  name,
  editState,
  setGig,
  delivery,
  price,
  setDelivery,
  setPrice,
  gig,
  features,
  setFeatures,
}: PackageBarProps) {
  const [toggle, setToggle] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  // price and delivery are controlled by parent
  const featureRef = useRef<HTMLInputElement>(null);

  // Helper to get the correct package key
  const getPackageKey = () => {
    if (name === "Basic") return "basic";
    if (name === "Standard") return "standard";
    if (name === "Premium") return "premium";
    return "basic";
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && features && !features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
      setFeatureInput("");
      featureRef.current?.focus();
    }
  };

  const removeFeature = (idx: number) => {
    if (features) {
      setFeatures(features.filter((_, i) => i !== idx));
    }
  };

  return (
    <div
      className={` ${Array.isArray(features) && features.length < 1 ? "opacity-50" : ""} flex flex-col`}
    >
      <div
        className={`flex px-3 items-center flex-wrap  py-3 gap-3 ${
          toggle && editState
            ? "bg-[#F2F3FF] rounded-t-xl"
            : "bg-[#F2F3FF]/50 rounded-xl"
        } border border-[#F1F5F9] ${editState ? "cursor-pointer hover:bg-[#4e46e58c]" : ""}`}
        onClick={() => { if(Array.isArray(features) && features.length > 0)setToggle((prev) => !prev)}}
      >
        {editState && <span>{">"}</span>}
        <span className="text-xl text-[#131B2E]">{name}</span>
        <span className="ml-auto font-bold text-xl text-[#3525CD]">
          ${plan.price}
        </span>
      </div>
      <div
        className={`${toggle && editState ? "scale-y-100 flex" : "scale-y-0 hidden"} transition-transform duration-100 ease-in-out gap-6 flex-col p-6 border-[#F1F5F9] border-b border-l border-r rounded-b-2xl origin-top }`}
        style={{ overflow: "hidden" }}
      >
        <div className="grid grid-cols-1 gap-3 md:flex">
          <div className="flex flex-col gap-1">
            <span className="ml-1">Price ($)</span>
            <input
              type="text"
              className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 w-20 rounded-lg border border-[#C7C4D8]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
            />
          </div>
          <div className="flex flex-col gap-1 md:ml-auto">
            <span className=" ml-1">Delivery</span>
            <select
              className="text-[#6B7280] bg-[#FFFFFF] w-fit text-xl p-3 rounded-lg border border-[#C7C4D8]"
              value={delivery ?? ""}
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value={"1 Day"}>1 Day</option>
              <option value={"2 Days"}>2 Days</option>
              <option value={"3 Days"}>3 Days</option>
              <option value={"5 Days"}>5 Days</option>
              <option value={"1 Week"}>1 Week</option>
              <option value={"10 Days"}>10 Days</option>
              <option value={"2 Weeks"}>2 Weeks</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="ml-1 w-full">Included features</span>
          <div className="flex flex-col gap-2">
            {(features || []).map((feature, id) => (
              <span key={id} className="flex min-w-0 items-center gap-2">
                <img src={checkIcon} className="w-5 h-5" alt="check" />
                <span className="break-all leading-tight">{feature}</span>
                <img
                  src={removeIcon}
                  onClick={() => {
                    if (Array.isArray(features) && features.length > 1)
                      removeFeature(id);
                  }}
                  className="cursor-pointer contrast-100 invert-50 w-3 h-3"
                  alt="remove"
                />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-3 mt-2">
          <input
            type="text"
            ref={featureRef}
            className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 w-full rounded-lg border border-[#bfbdc6] flex-1"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Add a feature..."
          />
          <button
            onClick={addFeature}
            className="cursor-pointer py-1 rounded-lg md:w-fit font-semibold text-white bg-[#4F46E5] px-6"
            type="button"
            disabled={Array.isArray(features) && features.length >= 20}
          >
            Add
          </button>
        </div>

        <button
          disabled={name === "Basic"}
          className={`${name === "Basic" ? "hidden" : ""} ml-auto w-fit cursor-pointer py-3 rounded-lg font-semibold  border border-neutral-500/15 text-white bg-red-400 px-6 flex items-center gap-1`}
          onClick={() => {setFeatures([]), setToggle(false)}}
        >
          <img src={deleteIcon} className="w-6 h-6" />
          Remove Plan
        </button>
      </div>
    </div>
  );
}

export default PackageBar;
