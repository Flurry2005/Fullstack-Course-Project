import checkIcon from "../../../assets/circle-check-req-icon.svg";
import { useEffect, type RefObject } from "react";
import type { Package as GigPackage } from "../../../types/Gig";
import type { Gig as NewGig } from "../../../types/Gig";
import removeIcon from "../../../assets/x-icon.svg";

type PackageProps = {
  tier: "basic" | "standard" | "premium";
  active: boolean;
  setActive?: (active: boolean) => void;
  price: string;
  setPrice?: (price: string) => void;
  deliveryTime: string;
  setDeliveryTime?: (time: string) => void;
  featureInput: string;
  setFeatureInput?: (feature: string) => void;
  featureRef: RefObject<HTMLInputElement | null>;
  addFeature: () => void;
  removeFeature: (id: number) => void;
  features: string[];
  setBasic: (GigPackage: GigPackage) => void;
  setStandard: (GigPackage: GigPackage) => void;
  setPremium: (GigPackage: GigPackage) => void;
  newGig: NewGig;
};

const tierLabels = {
  basic: { label: "Basic", color: "opacity-100" },
  standard: { label: "Standard", color: "opacity-100" },
  premium: { label: "Premium", color: "opacity-100" },
};

function Package({
  tier,
  active,
  setActive,
  price,
  setPrice,
  deliveryTime,
  setDeliveryTime,
  featureInput,
  setFeatureInput,
  featureRef,
  addFeature,
  removeFeature,
  features,
  setBasic,
  setStandard,
  setPremium,
}: PackageProps) {
  useEffect(() => {
    if (tier === "basic") {
      setBasic({
        price: price,
        delivery: deliveryTime,
        features: features,
      });
    }
    if (tier === "standard") {
      setStandard({
        price: price,
        delivery: deliveryTime,
        features: features,
      });
    }
    if (tier === "premium") {
      setPremium({
        price: price,
        delivery: deliveryTime,
        features: features,
      });
    }
  }, [price, deliveryTime, features]);

  return (
    <div
      className={`${active ? "opacity-100" : "opacity-25"} flex flex-col shadow-md rounded-2xl hover:border-[#4e46e58c] h-fit border border-[#C7C4D8]/15`}
    >
      <div
        onClick={setActive ? () => setActive(!active) : undefined}
        className="flex flex-col gap-1 bg-[#F2F3FF] hover:bg-[#4e46e58c] p-6 rounded-t-2xl cursor-pointer"
      >
        <span className="text-[#3525CD]">{`TIER 0${tier === "basic" ? "1" : tier === "standard" ? "2" : "3"}`}</span>
        <span className="font-semibold text-[#131B2E] text-xl">
          {tierLabels[tier].label}
        </span>
      </div>
      <div className="flex flex-col gap-6 bg-white p-6 border-t border-t-[#C7C4D8] border-b-0 rounded-b-2xl h-full">
        <div className="flex flex-col gap-1">
          <span className="text-[#464555] text-sm">Package Price ($)</span>
          <input
            type="text"
            className="bg-[#FFFFFF] p-3 border border-[#C7C4D8] rounded-lg text-[#6B7280] text-xl"
            value={price}
            onChange={(e) => {
              setPrice && setPrice(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#464555] text-sm">Delivery Time</span>
          <select
            className="bg-[#FFFFFF] p-3 border border-[#C7C4D8] rounded-lg text-[#6B7280] text-xl"
            value={deliveryTime}
            onChange={
              setDeliveryTime
                ? (e) => setDeliveryTime(e.target.value)
                : undefined
            }
          >
            <option>1 Day</option>
            <option>2 Days</option>
            <option>3 Days</option>
            <option>5 Days</option>
            <option>1 Week</option>
            <option>10 Days</option>
            <option>2 Weeks</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[#464555] text-sm">Included Features</span>
            <input
              type="text"
              ref={featureRef}
              className="bg-[#FFFFFF] p-3 border border-[#C7C4D8] rounded-lg text-[#6B7280] text-xl"
              value={featureInput}
              onChange={
                setFeatureInput
                  ? (e) => setFeatureInput(e.target.value)
                  : undefined
              }
            />
          </div>
          <button
            onClick={addFeature}
            className="place-self-start bg-[#4F46E5] px-6 py-1 rounded-lg font-semibold text-white cursor-pointer"
          >
            Add feature
          </button>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">
              {tierLabels[tier].label} Features
            </span>
            {features.map((feature, id) => (
              <span key={id} className="flex items-center gap-2 min-w-0">
                <img src={checkIcon} className="w-5 h-5" />
                <span className="break-all wrap-break-word leading-tight">
                  {feature}
                </span>
                <img
                  src={removeIcon}
                  onClick={() => removeFeature(id)}
                  className="invert-50 w-3 h-3 cursor-pointer contrast-100"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Package;
