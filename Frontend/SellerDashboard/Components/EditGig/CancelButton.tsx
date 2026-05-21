import cancelIcon from "../../../assets/cancel-icon.svg";
function CancelButton() {
  return (
    <button className="flex items-center gap-1 bg-white md:mr-auto justify-center py-1 px-3 w-fit border border-neutral-500/15 rounded-lg font-semibold text-[#464555] cursor-pointer">
      <img src={cancelIcon} className="w-5 h-5" />
      Cancel
    </button>
  );
}

export default CancelButton;
