import type { ReactNode } from "react";

interface Props {
  outline: true | false;
  children: ReactNode;
  onClick: () => void;
  additionalClasses?: string;
}

const GlowingButton = ({ outline, children, onClick, additionalClasses}: Props) => {
  return outline ? (
    <button
      className={`bg-transparent hover:bg-blue-600 px-4 py-2 border border-blue-600 hover:border-transparent rounded max-w-full text-blue-600 hover:text-white ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      className={`flex justify-center items-center bg-linear-to-r from-[#702AE1] to-[#D0B8FF] hover:shadow-[0_0_15px_rgba(112,42,225,0.7),0_0_20px_rgba(208,184,255,0.7)] px-4 py-2 rounded-xl w-80 max-w-full h-10 text-white active:scale-95 transition-shadow duration-150 ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GlowingButton;
