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
      className="border w-full bg-linear-to-r from-[#0050D4] to-[#7B9CFF] font-bold text-[#F1F2FF] py-4 rounded-xl
    "
      onClick={handleRedirect}
    >
      Continue (${price})
    </button>
  );
}

export default ContinueButton;
