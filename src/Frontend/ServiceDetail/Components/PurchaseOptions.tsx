import { useState } from "react";
import type { Package } from "../../types/Gig";
import featureIcon from "../../assets/circle-check-req-icon.svg";
import timeIcon from "../../assets/time-icon.svg";
import ContinueButton from "./ContinueButton";
import ContactSellerButton from "./ContactSellerButton";
import QuoteButton from "./QuoteButton";

type PurchaseOptionsProps = {
  options: {
    Basic?: Package;
    Standard?: Package;
    Premium?: Package;
  };
  gigId: string;
};

function PurchaseOptions({ options = {}, gigId }: PurchaseOptionsProps) {
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
    <div className="flex flex-col gap-6">
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
                className={`cursor-pointer flex border-b border-b-[#5A5781]/10 justify-center w-full p-4 ${selectedPlan === planName ? "bg-[#F3EEFF]" : ""} ${selectedPlan === "Basic" ? "rounded-tl-2xl" : ""}  ${selectedPlan === "Premium" ? "rounded-tr-2xl" : ""}`}
                onClick={() => displayCurrentPlan(planName)}
              >
                <span className="font-bold text-[#5A5781] max-sm:text-sm">
                  {planName}
                </span>
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[#464555] text-sm">Included features</span>

              {currentPlan?.features?.map((feature) => (
                <div className="flex flex-col">
                  <span className="flex items-center gap-3 font-semibold">
                    <img src={featureIcon} className="w-6 h-6" />
                    {feature}
                  </span>
                </div>
              ))}

              <span className="text-[#464555] text-sm">Delivery in</span>
              <span className="flex items-center gap-3 font-semibold">
                <img src={timeIcon} className="w-6 h-6" />
                {currentPlan?.delivery}
              </span>
            </div>

            <span className="mx-auto ld:ml-auto font-semibold text-[#464555] text-6xl">
              ${currentPlan?.price}
            </span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <ContinueButton
              gigId={gigId}
              tier={selectedPlan!}
              price={currentPlan?.price}
            />
            <ContactSellerButton />
            <p className="text-[#5A5781] text-sm">
              Secure checkout and satisfaction
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-[#0050D4]/5 p-6 rounded-2xl">
        <span className="place-self-center text-[#0050D4]">
          Custom Requirement?
        </span>
        <QuoteButton />
      </div>
    </div>
  );
}

export default PurchaseOptions;
