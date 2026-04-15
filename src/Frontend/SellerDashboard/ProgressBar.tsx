type ProgressBarBarProps = {
  status: boolean;
};

function ProgressBar({ status }: ProgressBarBarProps) {
  return (
    <span
      className={`${status ? "bg-[#91FEEF]" : "bg-[#7B9CFF]"} font-bold h-fit w-fit flex justify-center text-sm rounded-sm p-1 md:ml-auto `}
    >
      {status ? "In Progress" : "Revision"}
    </span>
  );
}

export default ProgressBar;
