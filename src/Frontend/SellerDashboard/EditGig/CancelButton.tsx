import cancelIcon from "../../assets/cancel-icon.svg";
function CancelButton() {
        return(<button className="mr-auto cursor-pointer py-3 rounded-lg font-semibold  border border-neutral-500/15 text-[#464555] bg-white px-6 flex items-center gap-1"><img src={cancelIcon} className="w-6 h-6"/>Cancel</button>)
}

export default CancelButton;