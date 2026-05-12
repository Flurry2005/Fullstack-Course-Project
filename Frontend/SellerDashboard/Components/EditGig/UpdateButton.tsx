import checkIcon from "../../../assets/circle-check-req-icon.svg";

type UpdateButtonProps = {
  text: String;
};
function UpdateButton({ text }: UpdateButtonProps) {
  return (
    <button className="flex items-center gap-1 bg-white ml-auto px-6 py-3 border border-neutral-500/15 rounded-lg font-semibold text-[#464555] cursor-pointer">
      <img src={checkIcon} className="w-6 h-6" />
      {text}
    </button>
  );
}

export default UpdateButton;
