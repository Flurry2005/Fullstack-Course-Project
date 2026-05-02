import { useRef, useEffect, useState } from "react";
import tipIcon from "../../assets/light-bulb-icon-green.svg";
import type { Gig as NewGig } from "../../types/Gig";
import Package from "./Package";
import type { Package as GigPackage } from "../../types/Gig";

type PricingProps = {
  newGig: NewGig;
  setBasic: (GigPackage: GigPackage) => void;
  setStandard: (GigPackage: GigPackage) => void;
  setPremium: (GigPackage: GigPackage) => void;
};

function Pricing({ newGig, setBasic, setStandard, setPremium }: PricingProps) {
  const basicFeatureRef = useRef<HTMLInputElement>(null);
  const standardFeatureRef = useRef<HTMLInputElement>(null);
  const premiumFeatureRef = useRef<HTMLInputElement>(null);
  const [basicInputPrice, setBasicInputPrice] = useState("");
  const [basicDeliveryTime, setBasicDeliveryTime] = useState("");
  const [basicInputFeature, setBasicInputFeature] = useState("");
  const [basicFeatures, setBasicFeatures] = useState<string[]>([]);
  const [standardInputPrice, setStandardInputPrice] = useState("");
  const [standardDeliveryTime, setStandardDeliveryTime] = useState("");
  const [standardInputFeature, setStandardInputFeature] = useState("");
  const [standardFeatures, setStandardFeatures] = useState<string[]>([]);
  const [premiumInputPrice, setPremiumInputPrice] = useState("");
  const [premiumDeliveryTime, setPremiumDeliveryTime] = useState("");
  const [premiumInputFeature, setPremiumInputFeature] = useState("");
  const [premiumFeatures, setPremiumFeatures] = useState<string[]>([]);
  const [standardActive, setStandardActive] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);

  useEffect(() => {
    setStandardActive(
      standardInputPrice.length > 0 || standardInputFeature.length > 0 || standardFeatures.length > 0
    );
    setPremiumActive(
      premiumInputPrice.length > 0 || premiumInputFeature.length > 0 || premiumFeatures.length > 0
    );
  }, [
    standardInputPrice,
    standardInputFeature,
    standardFeatures,
    premiumInputFeature,
    premiumInputPrice,
    premiumFeatures,
  ]);

  const addBasicFeature = () => {
    if (!basicFeatureRef.current?.value) return;
    const newFeature = basicFeatureRef.current.value.trim();
    if (!newFeature || basicFeatures.includes(newFeature)) return;
    setBasicFeatures((prev) => [...prev, newFeature]);
    setBasicInputFeature("");
  };

  const addStandardFeature = () => {
    if (!standardFeatureRef.current?.value) return;
    const newFeature = standardFeatureRef.current.value.trim();
    if (!newFeature || standardFeatures.includes(newFeature)) return;
    setStandardFeatures((prev) => [...prev, newFeature]);
    setStandardInputFeature("");
  };

  const addPremiumFeature = () => {
    if (!premiumFeatureRef.current?.value) return;
    const newFeature = premiumFeatureRef.current.value.trim();
    if (!newFeature || premiumFeatures.includes(newFeature)) return;
    setPremiumFeatures((prev) => [...prev, newFeature]);
    setPremiumInputFeature("");
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
        <Package
          tier="basic"
          setBasic={setBasic}
          setStandard={setStandard}
          setPremium={setPremium}
          active={true}
          price={basicInputPrice}
          setPrice={setBasicInputPrice}
          deliveryTime={basicDeliveryTime}
          setDeliveryTime={setBasicDeliveryTime}
          featureInput={basicInputFeature}
          setFeatureInput={setBasicInputFeature}
          featureRef={basicFeatureRef}
          addFeature={addBasicFeature}
          features={basicFeatures}
        />
        <Package
          tier="standard"
          setBasic={setBasic}
          setStandard={setStandard}
          setPremium={setPremium}
          active={standardActive}
          setActive={setStandardActive}
          price={standardInputPrice}
          setPrice={setStandardInputPrice}
          deliveryTime={standardDeliveryTime}
          setDeliveryTime={setStandardDeliveryTime}
          featureInput={standardInputFeature}
          setFeatureInput={setStandardInputFeature}
          featureRef={standardFeatureRef}
          addFeature={addStandardFeature}
          features={standardFeatures}
        />
        <Package
          setBasic={setBasic}
          setStandard={setStandard}
          setPremium={setPremium}
          tier="premium"
          active={premiumActive}
          setActive={setPremiumActive}
          price={premiumInputPrice}
          setPrice={setPremiumInputPrice}
          deliveryTime={premiumDeliveryTime}
          setDeliveryTime={setPremiumDeliveryTime}
          featureInput={premiumInputFeature}
          setFeatureInput={setPremiumInputFeature}
          featureRef={premiumFeatureRef}
          addFeature={addPremiumFeature}
          features={premiumFeatures}
        />
      </div>
      <div className="flex flex-col rounded-2xl w-[50vw] p-6 md:col-span-3 place-self-center text-[#67F4B7] bg-[#006E4B] gap-3">
        <span className="flex gap-1">
          <img src={tipIcon} className="w-6 h-6" />
          Pro Tip
        </span>
        <p className="px-6">
          Keep it sharp and to the point - concise features make it easier for
          people to quickly grasp the value.
        </p>
      </div>
    </div>
  );
}

export default Pricing;
