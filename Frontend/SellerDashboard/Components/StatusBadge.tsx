type StatusBadgeProps = {
  status: boolean;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`${status ? "bg-[#91FEEF]/75" : "bg-[#7B9CFF]"} font-semibold h-fit w-fit flex justify-center  text-[.75rem] rounded-sm px-2 p-1 ml-auto `}
    >
      {status ? "In Progress" : "Revision"}
    </span>
  );
}

export default StatusBadge;
