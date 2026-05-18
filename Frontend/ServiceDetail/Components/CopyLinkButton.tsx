import copyLinkIcon from "../../assets/copy-icon.svg";
import checkIcon from "../../assets/circle-check-req-icon.svg";

import { useState, useEffect } from "react";

function QuoteButton() {
  const [showCopied, setShowCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
  };

  useEffect(() => {
    if (!showCopied) return;

    const timer = window.setTimeout(() => setShowCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [showCopied]);

  return (
    <div className="relative">
      <button
        onClick={copyLink}
        className="border text-sm rounded-lg py-3 w-full font-bold flex gap-3 justify-center items-center text-[#0050D4] border-[#0050D4]/30
      hover: cursor-pointer hover:bg-[#0050D4]/30"
      >
        <img src={copyLinkIcon} className="w-5 h-5" />
        Copy link
      </button>

      <span
        className={`${showCopied ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"} font-semibold w-full absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-[#d1dff9] p-3 text-[#4458f1] transition-all duration-300`}
      >
        <img src={checkIcon} className="w-5 h-5" alt="Success" />
        Link copied to clipboard
      </span>
    </div>
  );
}
export default QuoteButton;
