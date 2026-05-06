import ContinueButton from "./ContinueButton";
import ContactSellerButton from "./ContactSellerButton";
import QuoteButton from "./QuoteButton";
import { useState } from "react";
import type { Package } from "../types/Gig";
import featureIcon from "../assets/circle-check-req-icon.svg";

type PurchaseOptionsProps = {
  options: {
    Basic?: Package;
    Standard?: Package;
    Premium?: Package;
  };
};

function PurchaseOptions({ options = {} }: PurchaseOptionsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    Object.keys(options)[0] ?? null,
  );

  const [currentPlan, setCurrentPlan] = useState<Package | null>(
    Object.values(options)[0] ?? null,
  );

  const displayCurrentPlan = (name: string) => {
    setSelectedPlan(name);
    const plan = options[name as keyof typeof options] ?? null;
    setCurrentPlan(plan);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col bg-white shadow-md rounded-2xl">
        <div className="grid grid-cols-3">
          {Object.entries(options)
            .filter(
              ([_, plan]) =>
                plan &&
                Array.isArray(plan.features) &&
                plan.features?.length > 0,
            )
            .map(([planName]) => (
              <div
                key={planName}
                className={`cursor-pointer flex border-b border-b-[#5A5781]/10 justify-center w-full p-4 ${selectedPlan === planName ? "bg-[#F3EEFF]" : ""}`}
                onClick={() => displayCurrentPlan(planName)}
              >
                <span className="max-sm:text-sm font-bold text-[#5A5781]">
                  {planName}
                </span>
              </div>
            ))}
        </div>

        <div className="flex flex-col p-6 gap-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col gap-3 ">
              <span className="text-[#464555] text-sm">Included features</span>
         
              {currentPlan?.features?.map((feature) => (<div className="flex flex-col"><span className="flex font-semibold gap-3 items-center"><img src={featureIcon} className="h-6 w-6"/>{feature}</span></div>))}
     
            </div>
            <span className="text-3xl md:text-4xl ml-auto font-semibold">
              ${currentPlan?.price}
            </span>
          </div>
         
          <div className="flex flex-col items-center gap-3">
            <ContinueButton price={currentPlan?.price} />
            <ContactSellerButton />
            <p className="text-sm text-[#5A5781]">
              Secure checkout and satisfaction
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#0050D4]/5 p-6 gap-3 rounded-2xl">
        <span className="text-[#0050D4] place-self-center">
          Custom Requirement?
        </span>
        <QuoteButton />
      </div>
    </div>
  );
}

export default PurchaseOptions;
