type ContinueButtonProps = {
  price?: number | any;
};

function ContinueButton({ price }: ContinueButtonProps) {
  return (
    <button className="border w-full bg-linear-to-r from-[#0050D4] to-[#7B9CFF] font-bold text-[#F1F2FF] py-4 rounded-xl">
      Continue (${price})
    </button>
  );
}

export default ContinueButton;
