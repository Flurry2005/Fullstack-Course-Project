import cancelIcon from "../../../assets/cancel-icon.svg";
function CancelButton() {
  return (
    <button className="flex items-center gap-1 bg-white md:mr-auto px-6 py-3 w-35 border border-neutral-500/15 rounded-lg font-semibold text-[#464555] cursor-pointer">
      <img src={cancelIcon} className="w-6 h-6" />
      Cancel
    </button>
  );
}

export default CancelButton;
