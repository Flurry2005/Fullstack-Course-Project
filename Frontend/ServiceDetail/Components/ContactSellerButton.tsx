import envelopeIcon from "../../assets/envelope-icon.svg";

function ContactSellerButton() {
  const openGmail = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1", "_blank");
  };

  return (
    <>
      <button
        onClick={openGmail}
        className="flex justify-center items-center gap-1 py-3 border border-[#75729E] rounded-xl w-full font-bold text-[#5A5781] text-sm transition-colors duration-200 hover:cursor-pointer hover:border-[#0050D4] hover:bg-[#0050D4]/5 hover:text-[#0050D4]"
      >
        <img src={envelopeIcon} className="w-5 h-5" /> Contact Seller
      </button>
    </>
  );
}

export default ContactSellerButton;
