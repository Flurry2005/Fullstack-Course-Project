import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  additionalClassName?: string;
}

function MiniButton({ to, text, additionalClassName }: Props) {
  return (
    <Link to={to}>
      <button
        className={`bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full font-medium text-white text-sm transition cursor-pointer ${additionalClassName}`}
      >
        {text}
      </button>
    </Link>
  );
}

export default MiniButton;
