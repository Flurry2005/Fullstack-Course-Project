import checkIcon from "../../../assets/circle-check-req-icon.svg";

type UpdateButtonProps = {
  text: String;
};
function UpdateButton({ text }: UpdateButtonProps) {
  return (
    <button className="flex items-center gap-1 justify-center bg-white md:ml-auto py-1 px-3 w-fit border border-neutral-500/15 rounded-lg font-semibold text-[#464555] cursor-pointer">
      <img src={checkIcon} className="w-5 h-5" />
      {text}
    </button>
  );
}

export default UpdateButton;
