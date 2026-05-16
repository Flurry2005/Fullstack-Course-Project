type StatusBadgeProps = {
  status: boolean;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`${status ? "bg-[#91FEEF]" : "bg-[#7B9CFF]"} font-semibold shadow-md h-fit w-fit flex justify-center  text-[.7rem] rounded-sm px-2 p-1 `}
    >
      {status ? "In Progress" : "Revision"}
    </span>
  );
}

export default StatusBadge;
