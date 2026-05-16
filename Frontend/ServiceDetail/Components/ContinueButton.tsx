import { useNavigate } from "react-router-dom";

type ContinueButtonProps = {
  price?: number | any;
  tier?: string;
  gigId?: string;
};

function ContinueButton({ price, tier, gigId }: ContinueButtonProps) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/checkout?gigId=${gigId}&tier=${tier}`);
  };

  return (
    <button
      className="border w-full bg-linear-to-r from-[#0050D4] to-[#7B9CFF] font-bold text-[#F1F2FF] py-4 rounded-xl transition-all duration-200 hover:cursor-pointer hover:from-[#003FA8] hover:to-[#5F7FE6] hover:shadow-[0_8px_18px_rgba(0,80,212,0.28)]"
      onClick={handleRedirect}
    >
      Continue (${price})
    </button>
  );
}

export default ContinueButton;
