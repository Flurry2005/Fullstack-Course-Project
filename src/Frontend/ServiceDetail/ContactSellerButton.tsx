import envelopeIcon from "../assets/envelope-icon.svg";

function ContactSellerButton() {
  return (
    <>
      <button className="flex justify-center items-center gap-1 border border-[#75729E] w-full font-bold text-sm text-[#5A5781] py-3 rounded-xl">
        <img src={envelopeIcon} className="w-5 h-5" /> Contact Seller
      </button>
    </>
  );
}

export default ContactSellerButton;
