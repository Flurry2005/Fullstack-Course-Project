import checkIcon from "../../assets/circle-check-req-icon.svg";
import { useEffect, type RefObject } from "react";
import type { Package as GigPackage } from "../../types/Gig";

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
  features: string[];
  setBasic: (GigPackage: GigPackage) => void;
  setStandard: (GigPackage: GigPackage) => void;
  setPremium: (GigPackage: GigPackage) => void;
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
      className={`${active ? "opacity-100" : "opacity-25"} flex flex-col shadow-md rounded-2xl hover:border-[#4e46e58c] h-fit border border-[#C7C4D8]`}
    >
      <div
        onClick={setActive ? () => setActive(!active) : undefined}
        className="cursor-pointer hover:bg-[#4e46e58c] flex gap-1 rounded-t-2xl flex-col p-6 bg-[#F2F3FF]"
      >
        <span className="text-[#3525CD]">{`TIER 0${tier === "basic" ? "1" : tier === "standard" ? "2" : "3"}`}</span>
        <span className="text-xl text-[#131B2E] font-semibold">
          {tierLabels[tier].label}
        </span>
      </div>
      <div className="flex border-t p-6 gap-6 border-b-0 h-full bg-white rounded-b-2xl border-t-[#C7C4D8] flex-col">
        <div className="flex flex-col gap-1">
          <span className="text-[#464555] text-sm">Package Price ($)</span>
          <input
            type="text"
            className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
            value={price}
            onChange={(e) => {
              setPrice && setPrice(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#464555] text-sm">Delivery Time</span>
          <select
            className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
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
              className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
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
            className="place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6"
          >
            Add feature
          </button>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-sm">{tierLabels[tier].label} Features</span>
            {features.map((feature) => (
              <span key={feature} className="flex min-w-0 items-start gap-2">
                <img src={checkIcon} className="w-5 h-5" />
                <span className="wrap-break-word break-all leading-tight">{feature}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Package;
