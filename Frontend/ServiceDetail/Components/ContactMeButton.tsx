function ContactMeButton() {

  const openGmail = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1", "_blank");
  };

  return (
    <button 
    onClick={openGmail}
    className="bg-[#0050D4] max-sm:mx-auto py-1 px-6 text-[#F1F2FF] h-fit w-fit shadow-[0_6px_14px_rgba(0,80,212,0.28)] rounded-xl
    hover: cursor-pointer">
      Contact Me
    </button>
  );
}
export default ContactMeButton;
