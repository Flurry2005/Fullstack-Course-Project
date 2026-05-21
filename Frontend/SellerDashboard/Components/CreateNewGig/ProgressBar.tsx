type ProgressBarProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepOneComplete: boolean;
  stepTwoComplete: boolean;
  stepThreeComplete: boolean;
};
function ProgressBar({ currentStep, setCurrentStep, stepOneComplete, stepTwoComplete, stepThreeComplete }: ProgressBarProps) {
  return (
    <div className="flex justify-center flex-wrap gap-6 items-center sd:w-[50vw] place-self-center">
      <div className="flex gap-3 w-fit">
        <span className="items-center flex gap-3 cursor-pointer" onClick={() => setCurrentStep(0)}>
          <span
            className={`rounded-full inline-flex bg-[#4F46E5] text-white md:h-8 md:w-8 w-4 h-4 p-3 text-sm items-center justify-center`}
          >
            1
          </span>
          <span
            className={`${currentStep === 0 ? "font-semibold" : "font-normal text-sm"}`}
          >
            Overview
          </span>
        </span>
        <hr className="flex-1 md:block w-f  w-25 self-center border-0 border-t border-[#C7C4D8]" />
        <span className="items-center flex gap-3 cursor-pointer" onClick={() => { if (stepOneComplete) setCurrentStep(1)}}>
          <span
            className={`rounded-full inline-flex ${currentStep < 1 ? "bg-[#EAEDFF] text-[#888787]" : "bg-[#4F46E5] text-white"} md:h-8 md:w-8 w-4 h-4 p-3 text-sm items-center justify-center`}
          
          >
            2
          </span>
          <span
            className={`${currentStep === 1 ? "font-semibold" : "font-normal text-sm"}`}
          >
            Description
          </span>
        </span>
      </div>
      <div className="flex gap-3 ">
        <hr className="flex-1 md:block hidden w-25 self-center border-0 border-t border-[#C7C4D8]" />
              <span className="items-center flex gap-3 cursor-pointer" onClick={() => { if (stepTwoComplete) setCurrentStep(2)}}>
          <span
            className={`rounded-full inline-flex ${currentStep < 2 ? "bg-[#EAEDFF] text-[#888787]" : "bg-[#4F46E5] text-white"} md:h-8 md:w-8 w-4 h-4 p-3 text-sm items-center justify-center`}
          
          >
            3
          </span>
          <span
            className={`${currentStep === 2 ? "font-semibold" : "font-normal text-sm"}`}
          >
            Pricing
          </span>
        </span>
        <hr className="flex-1 md:block  w-25 self-center border-0 border-t border-[#C7C4D8]" />
                  <span className="items-center flex gap-3 cursor-pointer" onClick={() => { if (stepThreeComplete) setCurrentStep(3)}}>
          <span
            className={`rounded-full inline-flex ${currentStep < 3 ? "bg-[#EAEDFF] text-[#888787]" : "bg-[#4F46E5] text-white"} md:h-8 md:w-8 w-4 h-4 p-3 text-sm items-center justify-center `}
          
          >
            4
          </span>
          <span
            className={`${currentStep === 3 ? "font-semibold" : "font-normal text-sm"}`}
          >
            Review & Publish
          </span>
        </span>
      </div>
    </div>
  );
}
export default ProgressBar;
