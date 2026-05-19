import checkIcon from "../../../assets/circle-check-req-icon.svg";

type UpdateButtonProps = {
  text: String;
};
function UpdateButton({ text }: UpdateButtonProps) {
  return (
    <button className="flex items-center gap-1 justify-center bg-white md:ml-auto  w-35 px-1.5 py-3  border border-neutral-500/15 rounded-lg font-semibold text-[#464555] cursor-pointer">
      <img src={checkIcon} className="w-6 h-6" />
      {text}
    </button>
  );
}

export default UpdateButton;
