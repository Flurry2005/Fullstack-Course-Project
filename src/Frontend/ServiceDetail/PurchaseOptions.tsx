import ContinueButton from "./ContinueButton";
import ContactSellerButton from "./ContactSellerButton";
import QuoteButton from "./QuoteButton";
import { useState } from "react";

type PlanDetails = {
  title: string;
  about: string;
  price: number;
};

type PurchaseOptionsProps = {
  options?: {
    Basic?: PlanDetails;
    Standard?: PlanDetails;
    Premium?: PlanDetails;
  };
};

function PurchaseOptions({ options = {} }: PurchaseOptionsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    Object.keys(options)[0] ?? null,
  );

  const [currentPlan, setCurrentPlan] = useState<PlanDetails | null>(
    Object.values(options)[0] ?? null,
  );

  const displayCurrentPlan = (name: string) => {
    setSelectedPlan(name);
    const plan = options[name as keyof typeof options] ?? null;
    setCurrentPlan(plan);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col bg-white rounded-2xl">
        <div className="grid grid-cols-3">
          {Object.entries(options).map(([planName, plan]) => (
            <div
              key={planName}
              className={`cursor-pointer flex border-b border-b-[#5A5781]/10 justify-center w-full p-4 ${selectedPlan === planName ? "bg-[#F3EEFF]" : ""}`}
              onClick={() => displayCurrentPlan(planName)}
            >
              <span className="max-sm:text-sm font-bold text-[#5A5781]">{planName}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col p-6 gap-6">
          <div className="flex items-center">
            <h3 className="text-xl text-[#2C2A51] font-bold">
              {currentPlan?.title}
            </h3>
            <span className="text-2xl ml-auto font-bold">
              ${currentPlan?.price}
            </span>
          </div>
          <p className="text-[#5A5781]">{currentPlan?.about}</p>
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
