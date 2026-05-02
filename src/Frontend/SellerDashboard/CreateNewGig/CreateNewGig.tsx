import NavBar from "../../NavBar";
import Footer from "../../Footer";
import GoBackIcon from "../../assets/go-back-arrow.svg";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import Overview from "./Overview";
import Description from "./Description";
import Pricing from "./Pricing";
import Summary from "./Summary";
import type { Gig as NewGig } from "../../types/Gig";
import type { Category } from "../../types/Gig";
import type { Package } from "../../types/Gig";

function CreateNewGig() {
  const [newGig, setNewGig] = useState<NewGig>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const seller = "admin";

  const setTitle = (title: string) => {
    if (!title.trim()) return;
    setNewGig((prev) => {
      return { ...prev, title, seller };
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
    console.log("updated gig: ")
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
        <ProgressBar currentStep={currentStep} />
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
            <Description newGig={newGig} setDescription={setDescription} />
          )}
          {currentStep === 2 && (
            <Pricing
              newGig={newGig}
              setBasic={setBasic}
              setStandard={setStandard}
              setPremium={setPremium}
            />
          )}
          {currentStep === 3 && <Summary />}
        </section>
        <div className="flex gap-1 justify-between">
          {currentStep > 0 && (
            <button
              className="mr-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}

          <button
            className="ml-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {currentStep !== 2 ? "Next" : "Finalize"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CreateNewGig;
