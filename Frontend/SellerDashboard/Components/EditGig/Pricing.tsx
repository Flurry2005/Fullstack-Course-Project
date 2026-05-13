import type { Gig } from "../../../types/Gig";
import CancelButton from "./CancelButton";
import PackageBar from "./PackageBar";
import UpdateButton from "./UpdateButton";
import { useState } from "react";

type Pricing = {
  gig: Gig;
  setGig: React.Dispatch<React.SetStateAction<Gig | undefined>>;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

function Pricing({ gig, setGig, setEditState, setConfirm }: Pricing) {
  const [basicDelivery, setBasicDelivery] = useState(gig.basic?.delivery);
  const [standardDelivery, setStandardDelivery] = useState(
    gig.standard?.delivery,
  );
  const [premiumDelivery, setPremiumDelivery] = useState(gig.premium?.delivery);
  const [basicPrice, setBasicPrice] = useState(gig?.basic?.price);
  const [standardPrice, setStandardPrice] = useState(gig?.standard?.price);
  const [premiumPrice, setPremiumPrice] = useState(gig?.premium?.price);
  const [basicFeatures, setBasicFeatures] = useState(gig?.basic?.features);
  const [standardFeatures, setStandardFeatures] = useState(
    gig?.standard?.features,
  );
  const [premiumFeatures, setPremiumFeatures] = useState(
    gig?.premium?.features,
  );

  const handleUpdate = () => {
    setGig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        basic: {
          ...prev.basic,
          price: basicPrice,
          delivery: basicDelivery,
          features: basicFeatures,
        },
        standard: {
          ...prev.standard,
          price: standardPrice,
          delivery: standardDelivery,
          features: standardFeatures,
        },
        premium: {
          ...prev.premium,
          price: premiumPrice,
          delivery: premiumDelivery,
          features: premiumFeatures,
        },
      };
    });
    setEditState(false);
    setConfirm(true);
  };
  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Pricing & Packages</h3>
            <p>Define your packages to offer variety to your clients.</p>
          </div>

          <div className="flex flex-col gap-3">
            {gig?.basic?.features && (
              <PackageBar
                name="Basic"
                plan={gig?.basic}
                setDelivery={setBasicDelivery}
                setPrice={setBasicPrice}
                price={basicPrice}
                setFeatures={setBasicFeatures}
                features={basicFeatures}
                delivery={basicDelivery}
                editState={true}
              />
            )}
            {gig?.standard?.features && gig.standard.features.length > 0 && (
              <PackageBar
                name="Standard"
                plan={gig?.standard}
                setDelivery={setStandardDelivery}
                setPrice={setStandardPrice}
                setFeatures={setStandardFeatures}
                features={standardFeatures}
                price={standardPrice}
                delivery={standardDelivery}
                editState={true}
              />
            )}
            {gig?.premium?.features && gig.premium.features.length > 0 && (
              <PackageBar
                name="Premium"
                plan={gig?.premium}
                setDelivery={setPremiumDelivery}
                setPrice={setPremiumPrice}
                price={premiumPrice}
                setFeatures={setPremiumFeatures}
                features={premiumFeatures}
                delivery={premiumDelivery}
                editState={true}
              />
            )}
          </div>
        </div>
        <span className="flex">
          <span onClick={() => setEditState(false)}>
            {" "}
            <CancelButton />
          </span>
          <span className="ml-auto" onClick={handleUpdate}>
            <UpdateButton text={"Update"} />
          </span>
        </span>
      </div>
    </div>
  );
}
export default Pricing;
