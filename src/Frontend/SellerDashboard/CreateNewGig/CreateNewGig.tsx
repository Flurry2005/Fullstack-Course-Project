import NavBar from "../../NavBar";
import Footer from "../../Footer";
import GoBackIcon from "../../assets/go-back-arrow.svg";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Description from "./Description";
import Pricing from "./Pricing";
import Review from "./Review";
import type { Gig as NewGig } from "../../types/Gig";
import type { Category } from "../../types/Gig";
import type { Package } from "../../types/Gig";

function CreateNewGig() {
  const [primaryImagePreview, setPrimaryImagePreview] = useState<string>("");
  const [secondaryImagePreview, setSecondaryImagePreview] =
    useState<string>("");
  const [ternaryImagePreview, setTernaryImagePreview] = useState<string>("");
  const [newGig, setNewGig] = useState<NewGig>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepOneComplete, setStepOneComplete] = useState(false);
  const [stepTwoComplete, setStepTwoComplete] = useState(false);
  const [stepThreeComplete, setStepThreeComplete] = useState(false);
  const [success, setSuccess] = useState(false);

  //Step verification
  useEffect(() => {
    if (
      newGig?.title &&
      newGig?.category?.main &&
      newGig.category?.sub &&
      Array.isArray(newGig.tags) &&
      newGig.tags.length > 0
    ) {
      console.log("Step 1 complete");
      setStepOneComplete(true);
    } else {
      setStepOneComplete(false);
      console.log("Incomplete (Step 1)");
    }

    if (newGig?.description && primaryImagePreview) {
      setStepTwoComplete(true);
      console.log("Step 2 complete");
    } else {
      setStepTwoComplete(false);
      console.log("Step 2 incomplete");
    }

    const isValidPrice = (price: any) =>
      price && !Number.isNaN(parseInt(price)) && price > 0;
    const hasFeatures = (pkg: any) =>
      Array.isArray(pkg?.features) && pkg.features.length > 0;

    const basicValid =
      isValidPrice(newGig.basic?.price) && hasFeatures(newGig.basic);
    const standardValid =
      (!newGig.standard?.price && !hasFeatures(newGig.standard)) ||
      (isValidPrice(newGig.standard?.price) && hasFeatures(newGig.standard));
    const premiumValid =
      (!newGig.premium?.price && !hasFeatures(newGig.premium)) ||
      (isValidPrice(newGig.premium?.price) && hasFeatures(newGig.premium));

    if (basicValid && standardValid && premiumValid) {
      setStepThreeComplete(true);
      console.log("Step three completeeee");
    } else {
      setStepThreeComplete(false);
      console.log("Step 3 incomplete");
    }
  }, [newGig, primaryImagePreview]);

  // FML in the name of interactivity
  const [basicInputPrice, setBasicInputPrice] = useState("");
  const [basicDeliveryTime, setBasicDeliveryTime] = useState("1 Day");
  const [basicInputFeature, setBasicInputFeature] = useState("");
  const [basicFeatures, setBasicFeatures] = useState<string[]>([]);
  const [standardInputPrice, setStandardInputPrice] = useState("");
  const [standardDeliveryTime, setStandardDeliveryTime] = useState("1 Day");
  const [standardInputFeature, setStandardInputFeature] = useState("");
  const [standardFeatures, setStandardFeatures] = useState<string[]>([]);
  const [premiumInputPrice, setPremiumInputPrice] = useState("");
  const [premiumDeliveryTime, setPremiumDeliveryTime] = useState("1 Day");
  const [premiumInputFeature, setPremiumInputFeature] = useState("");
  const [premiumFeatures, setPremiumFeatures] = useState<string[]>([]);

  const setTitle = (title: string) => {
    setNewGig((prev) => {
      return { ...prev, title };
    });
  };

  const setCategory = (category: Category) => {
    if (!category.main?.trim() && !category.sub?.trim()) return;
    setNewGig((prev) => {
      return { ...prev, category };
    });
  };

  const setTags = (tags: string[]) => {
    setNewGig((prev) => {
      return { ...prev, tags };
    });
  };

  const setDescription = (description: string) => {
    setNewGig((prev) => {
      return { ...prev, description };
    });
  };

  const setBasic = (basic: Package) => {
    setNewGig((prev) => {
      return { ...prev, basic };
    });
  };

  const setStandard = (standard: Package) => {
    setNewGig((prev) => {
      return { ...prev, standard };
    });
  };

  const setPremium = (premium: Package) => {
    setNewGig((prev) => {
      return { ...prev, premium };
    });
  };

  useEffect(() => {
    console.log("updated gig: ");
    console.log(newGig);
  }, [newGig]);

  return (
    <>
      <NavBar />
      <div className="bg-white border-b border-[#E2E8F0] flex items-center p-6">
        {" "}
        <Link to="..">
          <img src={GoBackIcon} className="cursor-pointer w-10 h-14" />
        </Link>
        <h2 className="text-3xl font-semibold p-6">Create New Gig</h2>
      </div>

      <main className="flex flex-col w-full bg-[#f9f5ff] p-6 gap-10">
        {!success && <ProgressBar currentStep={currentStep} />}
        <section>
          {currentStep === 0 && (
            <Overview
              newGig={newGig}
              setTitle={setTitle}
              setCategory={setCategory}
              setFinalTags={setTags}
            />
          )}
          {currentStep === 1 && (
            <Description
              newGig={newGig}
              setDescription={setDescription}
              primaryImagePreview={primaryImagePreview}
              setPrimaryImagePreview={setPrimaryImagePreview}
              secondaryImagePreview={secondaryImagePreview}
              setSecondaryImagePreview={setSecondaryImagePreview}
              ternaryImagePreview={ternaryImagePreview}
              setTernaryImagePreview={setTernaryImagePreview}
            />
          )}
          {currentStep === 2 && (
            <Pricing
              newGig={newGig}
              setBasic={setBasic}
              setStandard={setStandard}
              setPremium={setPremium}
              // FML
              basicInputPrice={basicInputPrice}
              setBasicInputPrice={setBasicInputPrice}
              basicDeliveryTime={basicDeliveryTime}
              setBasicDeliveryTime={setBasicDeliveryTime}
              basicInputFeature={basicInputFeature}
              setBasicInputFeature={setBasicInputFeature}
              basicFeatures={basicFeatures}
              setBasicFeatures={setBasicFeatures}
              standardInputPrice={standardInputPrice}
              setStandardInputPrice={setStandardInputPrice}
              standardDeliveryTime={standardDeliveryTime}
              setStandardDeliveryTime={setStandardDeliveryTime}
              standardInputFeature={standardInputFeature}
              setStandardInputFeature={setStandardInputFeature}
              standardFeatures={standardFeatures}
              setStandardFeatures={setStandardFeatures}
              premiumInputPrice={premiumInputPrice}
              setPremiumInputPrice={setPremiumInputPrice}
              premiumDeliveryTime={premiumDeliveryTime}
              setPremiumDeliveryTime={setPremiumDeliveryTime}
              premiumInputFeature={premiumInputFeature}
              setPremiumInputFeature={setPremiumInputFeature}
              premiumFeatures={premiumFeatures}
              setPremiumFeatures={setPremiumFeatures}
            />
          )}
          {currentStep === 3 && (
            <Review
              success={success}
              setSuccess={setSuccess}
              newGig={newGig}
              primaryImagePreview={primaryImagePreview}
            />
          )}
        </section>
        <div className="flex gap-1 justify-between">
          {currentStep > 0 && !success && (
            <button
              className="mr-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < 3 && (
            <button
              className={`${(currentStep === 0 && stepOneComplete) || (currentStep === 1 && stepTwoComplete) || (currentStep === 2 && stepThreeComplete) ? "opacity-100" : "opacity-25"} ml-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6`}
              onClick={() => {
                if (
                  (currentStep === 0 && stepOneComplete) ||
                  (currentStep === 1 && stepTwoComplete) ||
                  (currentStep === 2 && stepThreeComplete)
                )
                  setCurrentStep(currentStep + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CreateNewGig;
