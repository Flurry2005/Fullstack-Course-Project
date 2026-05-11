import checkIcon from "../../assets/circle-check-req-icon.svg";

type UpdateButtonProps = {
    text: String
}
function UpdateButton( { text } : UpdateButtonProps) {
    return(<button className="ml-auto cursor-pointer py-3 rounded-lg font-semibold border border-neutral-500/15 text-[#464555] bg-white px-6 flex items-center gap-1"><img src={checkIcon} className="w-6 h-6"/>{text}</button>)
}

export default UpdateButton;