import type React from "react";
import { Link } from "react-router-dom";

interface Props {
  onClick?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  to?: string;
  text: string;
  additionalClassName?: string;
}

function MiniButton({ onClick, to, text, additionalClassName }: Props) {
  return (
    <>
      {to ? (
        <Link to={to}>
          <button
            onClick={() => onClick}
            className={`bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full font-medium text-white text-sm transition cursor-pointer ${additionalClassName}`}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          onClick={() => onClick}
          className={`bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full font-medium text-white text-sm transition cursor-pointer ${additionalClassName}`}
        >
          {text}
        </button>
      )}
    </>
  );
}

export default MiniButton;