import { useRef, useEffect, useState } from "react";
import tipIcon from "../../assets/light-bulb-icon-green.svg";
import type { Gig as NewGig } from "../../types/Gig";
import Package from "./Package";
import type { Package as GigPackage } from "../../types/Gig";

type PricingProps = {
  //FML
  newGig: NewGig;
  setBasic: (GigPackage: GigPackage) => void;
  setStandard: (GigPackage: GigPackage) => void;
  setPremium: (GigPackage: GigPackage) => void;
  basicInputPrice: string;
  setBasicInputPrice: (v: string) => void;
  basicDeliveryTime: string;
  setBasicDeliveryTime: (v: string) => void;
  basicInputFeature: string;
  setBasicInputFeature: (v: string) => void;
  basicFeatures: string[];
  setBasicFeatures: (v: string[]) => void;
  standardInputPrice: string;
  setStandardInputPrice: (v: string) => void;
  standardDeliveryTime: string;
  setStandardDeliveryTime: (v: string) => void;
  standardInputFeature: string;
  setStandardInputFeature: (v: string) => void;
  standardFeatures: string[];
  setStandardFeatures: (v: string[]) => void;
  premiumInputPrice: string;
  setPremiumInputPrice: (v: string) => void;
  premiumDeliveryTime: string;
  setPremiumDeliveryTime: (v: string) => void;
  premiumInputFeature: string;
  setPremiumInputFeature: (v: string) => void;
  premiumFeatures: string[];
  setPremiumFeatures: (v: string[]) => void;
};

function Pricing({
  //FML
  newGig,
  setBasic,
  setStandard,
  setPremium,
  basicInputPrice,
  setBasicInputPrice,
  basicDeliveryTime,
  setBasicDeliveryTime,
  basicInputFeature,
  setBasicInputFeature,
  basicFeatures,
  setBasicFeatures,
  standardInputPrice,
  setStandardInputPrice,
  standardDeliveryTime,
  setStandardDeliveryTime,
  standardInputFeature,
  setStandardInputFeature,
  standardFeatures,
  setStandardFeatures,
  premiumInputPrice,
  setPremiumInputPrice,
  premiumDeliveryTime,
  setPremiumDeliveryTime,
  premiumInputFeature,
  setPremiumInputFeature,
  premiumFeatures,
  setPremiumFeatures,
}: PricingProps) {
  const basicFeatureRef = useRef<HTMLInputElement>(null);
  const standardFeatureRef = useRef<HTMLInputElement>(null);
  const premiumFeatureRef = useRef<HTMLInputElement>(null);
  const [standardActive, setStandardActive] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);

  useEffect(() => {
    setStandardActive(
      standardInputPrice.length > 0 ||
        standardInputFeature.length > 0 ||
        standardFeatures.length > 0,
    );
    setPremiumActive(
      premiumInputPrice.length > 0 ||
        premiumInputFeature.length > 0 ||
        premiumFeatures.length > 0,
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
    setBasicFeatures([...basicFeatures, newFeature]);
    setBasicInputFeature("");
  };

  const removeBasicFeature = (removeId: number) => {
    setBasicFeatures(basicFeatures.filter((_, id) => id !== removeId));
  };

  const removeStandardFeature = (removeId: number) => {
    setStandardFeatures(standardFeatures.filter((_, id) => id !== removeId));
  };

  const removePremiumFeature = (removeId: number) => {
    setPremiumFeatures(premiumFeatures.filter((_, id) => id !== removeId));
  };

  const addStandardFeature = () => {
    if (!standardFeatureRef.current?.value) return;
    const newFeature = standardFeatureRef.current.value.trim();
    if (!newFeature || standardFeatures.includes(newFeature)) return;
    setStandardFeatures([...standardFeatures, newFeature]);
    setStandardInputFeature("");
  };

  const addPremiumFeature = () => {
    if (!premiumFeatureRef.current?.value) return;
    const newFeature = premiumFeatureRef.current.value.trim();
    if (!newFeature || premiumFeatures.includes(newFeature)) return;
    setPremiumFeatures([...premiumFeatures, newFeature]);
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
          newGig={newGig}
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
          removeFeature={removeBasicFeature}
          features={basicFeatures}
        />
        <Package
          newGig={newGig}
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
          removeFeature={removeStandardFeature}
          features={standardFeatures}
        />
        <Package
          newGig={newGig}
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
          removeFeature={removePremiumFeature}
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
