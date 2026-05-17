type StatusBadgeProps = {
  status: boolean;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`${status ? "bg-[#91feef82]" : "bg-[#7B9CFF]"} font-semibold text-[#3a3838] shadow-md h-fit w-fit flex justify-center  text-[.7rem] rounded-sm px-2 p-1 `}
    >
      {status ? "In Progress" : "Revision"}
    </span>
  );
}

export default StatusBadge;
