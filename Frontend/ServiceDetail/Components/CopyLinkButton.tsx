function QuoteButton() {

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      onClick={copyLink}
      className="border text-sm rounded-lg py-3 font-bold text-[#0050D4] border-[#0050D4]/30
      hover: cursor-pointer hover:bg-[#0050D4]/30">
      Copy link
    </button>
  );
}
export default QuoteButton;
