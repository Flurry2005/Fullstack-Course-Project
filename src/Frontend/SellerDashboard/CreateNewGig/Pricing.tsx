import { useRef, useState } from "react";
import checkIcon from "../../assets/circle-check-req-icon.svg";

function Pricing() {
  const basicFeatureRef = useRef<HTMLInputElement>(null);
  const standardFeatureRef = useRef<HTMLInputElement>(null);
  const premiumFeatureRef = useRef<HTMLInputElement>(null);
  const [features, setFeatures] = useState<Record<string, string>>({});

  const addBasicFeature = () => {
    if (!basicFeatureRef.current?.value) return;

    const newFeature = basicFeatureRef.current?.value;
    setFeatures((prev) => {
      return { ...prev, [newFeature]: "basic" };
    });
  };

  const addStandardFeature = () => {
    if (!standardFeatureRef.current?.value) return;

    const newFeature = standardFeatureRef.current?.value;
    setFeatures((prev) => {
      return { ...prev, [newFeature]: "standard" };
    });
  };

  const addPremiumFeature = () => {
    if (!premiumFeatureRef.current?.value) return;

    const newFeature = premiumFeatureRef.current?.value;
    setFeatures((prev) => {
      return { ...prev, [newFeature]: "premium" };
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-4xl">Gig Scope & Pricing </h2>
        <p className="text-[#464555] text-xl ">
          Define your packages to offer variety to your clients.
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <div className="flex flex-col shadow-md rounded-2xl h-fit border border-[#C7C4D8]">
          <div className="flex gap-1  rounded-t-2xl flex-col p-6 bg-[#F2F3FF]">
            <span className="text-[#3525CD]">TIER 01</span>
            <span className="text-xl text-[#131B2E] font-semibold">Basic</span>
          </div>
          <div className="flex border-t p-6 gap-6 border-b-0 h-full bg-white rounded-b-2xl border-t-[#C7C4D8] flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Package Price ($)</span>
              <input
                type="text"
                className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Delivery Time</span>
              <select className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]">
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
                <span className="text-[#464555] text-sm">
                  Included Features
                </span>
                <input
                  type="text"
                  ref={basicFeatureRef}
                  className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
                />
              </div>
              <button
                onClick={() => addBasicFeature()}
                className="place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6"
              >
                Add feature
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex min-w-0 flex-col gap-1 border-r border-[#C7C4D8] p-1">
                  <span className="font-semibold text-sm">Basic</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "basic")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col gap-1 border-r border-[#C7C4D8] p-1">
                  <span className="font-semibold text-sm">Standard</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "standard")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2 opacity-50"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col gap-1 p-1">
                  <span className="font-semibold text-sm">Premium</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "premium")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2 opacity-50"
                      >
                        <img src={checkIcon} className="w-5 h-5 opacity-50" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col shadow-md rounded-2xl h-fit border border-[#C7C4D8]">
          <div className="flex gap-1  rounded-t-2xl flex-col p-6 bg-[#F2F3FF]">
            <span className="text-[#3525CD]">TIER 02</span>
            <span className="text-xl text-[#131B2E] font-semibold">
              Standard
            </span>
          </div>
          <div className="flex border-t p-6 gap-6 border-b-0 h-full bg-white rounded-b-2xl border-t-[#C7C4D8] flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Package Price ($)</span>
              <input
                type="text"
                className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Delivery Time</span>
              <select className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]">
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
                <span className="text-[#464555] text-sm">
                  Included Features
                </span>
                <input
                  type="text"
                  ref={standardFeatureRef}
                  className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
                />
              </div>
              <button
                onClick={() => addStandardFeature()}
                className="place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6"
              >
                Add feature
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex min-w-0 flex-col border-r border-[#C7C4D8] p-1 gap-1">
                  <span className="font-semibold text-sm">Basic</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "basic")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col border-r border-[#C7C4D8] p-1 gap-1">
                  <span className="font-semibold text-sm">Standard</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "standard")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col gap-1 p-1">
                  <span className="font-semibold text-sm">Premium</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "premium")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2 opacity-50"
                      >
                        <img src={checkIcon} className="w-5 h-5 opacity-50" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col shadow-md rounded-2xl h-fit border border-[#C7C4D8]">
          <div className="flex gap-1  rounded-t-2xl flex-col p-6 bg-[#F2F3FF]">
            <span className="text-[#3525CD]">TIER 03</span>
            <span className="text-xl text-[#131B2E] font-semibold">
              Premium
            </span>
          </div>
          <div className="flex border-t p-6 gap-6 border-b-0 h-full bg-white rounded-b-2xl border-t-[#C7C4D8] flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Package Price ($)</span>
              <input
                type="text"
                className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#464555] text-sm">Delivery Time</span>
              <select className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]">
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
                <span className="text-[#464555] text-sm">
                  Included Features
                </span>
                <input
                  type="text"
                  ref={premiumFeatureRef}
                  className="text-[#6B7280] bg-[#FFFFFF] text-xl p-3 rounded-lg border border-[#C7C4D8]"
                />
              </div>
              <button
                onClick={() => addPremiumFeature()}
                className="place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6"
              >
                Add feature
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex min-w-0 flex-col border-r border-[#C7C4D8] p-1 gap-1">
                  <span className="font-semibold text-sm">Basic</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "basic")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col border-r border-[#C7C4D8] p-1 gap-1">
                  <span className="font-semibold text-sm">Standard</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "standard")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
                <div className="flex min-w-0 flex-col border-r border-[#C7C4D8] p-1 gap-1">
                  <span className="font-semibold text-sm">Premium</span>
                  {Object.entries(features)
                    .filter(([, value]) => value === "premium")
                    .map(([feature]) => (
                      <span
                        key={feature}
                        className="flex min-w-0 items-start gap-2"
                      >
                        <img src={checkIcon} className="w-5 h-5" />
                        <span className="wrap-break-word leading-tight">{feature}</span>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
