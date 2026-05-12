import envelopeIcon from "../../assets/envelope-icon.svg";

function ContactSellerButton() {
  return (
    <>
      <button className="flex justify-center items-center gap-1 py-3 border border-[#75729E] rounded-xl w-full font-bold text-[#5A5781] text-sm">
        <img src={envelopeIcon} className="w-5 h-5" /> Contact Seller
      </button>
    </>
  );
}

export default ContactSellerButton;
