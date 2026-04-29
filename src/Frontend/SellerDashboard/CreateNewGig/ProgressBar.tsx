type ProgressBarProps = {
  currentStep: number;
};
function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex gap-6 items-center">
      <span className={`rounded-full inline-flex bg-[#4F46E5] h-8 w-8 text-sm items-center justify-center text-white`}>
        1
      </span>
      <span className={`${currentStep === 0 ? "font-semibold" : "font-normal text-sm"}`}>
        Overview
      </span>
      <hr className="flex-1 self-center border-0 border-t border-[#C7C4D8]" />
      <span className={`rounded-full inline-flex ${currentStep < 1 ? "bg-[#EAEDFF] text" : "bg-[#4F46E5] "} h-8 w-8 items-center text-sm justify-center text-white`}>
        2
      </span>
      <span className={`${currentStep === 1 ? "font-semibold" : "font-normal text-sm"}`}>
        Description
      </span>
      <hr className="flex-1 self-center border-0 border-t border-[#C7C4D8]" />
      <span className={`rounded-full inline-flex ${currentStep < 2 ? "bg-[#EAEDFF] text" : "bg-[#4F46E5] "} h-8 w-8 items-center text-sm justify-center text-white`}>
        3
      </span>
      <span className={`${currentStep === 2 ? "font-semibold" : "font-normal text-sm"}`}>
        Pricing
      </span>
    </div>
  );
}
export default ProgressBar;
