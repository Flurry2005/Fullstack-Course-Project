import NavBar from "../../NavBar";
import Footer from "../../Footer";
import GoBackIcon from "../../assets/go-back-arrow.svg";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Overview from "./Overview";
import Description from "./Description";
import Pricing from "./Pricing";

function CreateNewGig() {
  const [currentStep, setCurrentStep] = useState<number>(0);
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
          {currentStep === 0 && <Overview />}
          {currentStep === 1 && <Description />}
          {currentStep === 2 && <Pricing />}
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
