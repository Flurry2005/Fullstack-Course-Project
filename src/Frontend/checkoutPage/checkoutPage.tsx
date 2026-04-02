import InputField from "../Components/General/InputField";
import MiniButton from "../Components/HomePageComponents/MiniButtonLink";
import "../App.css";
import NavBar from "../NavBar";

function CheckoutPage() {
  return (
    <>
      <NavBar />

      <main className="flex justify-between gap-5 bg-[#f9f5ff] px-5 h-screen">
        {/* Left main container */}
        <div className="flex flex-col gap-5 w-7/10">
          <h1>Finalize your order</h1>
          {/* Payment Method */}
          <section className="flex gap-15 w-full">
            <button className="bg-[#ffff] rounded-2xl w-1/3 h-30">
              <i className="text-left fa-regular fa-credit-card"></i>
              <h4 className="text-left">Credit/Debit Card</h4>
              <h6 className="text-left">Visa, Mastercard, Amex</h6>
            </button>

            <button className="bg-[#ffff] rounded-2xl w-1/3 h-30">
              <i className="fa-brands fa-paypal"></i>
              <h4 className="text-left">PayPal</h4>
              <h6 className="text-left">Direct wallet transfer</h6>
            </button>

            <button className="bg-[#ffff] rounded-2xl w-1/3 h-30">
              <i className="fa-brands fa-apple-pay"></i>
              <h4 className="text-left">Apple Pay</h4>
              <h6 className="text-left">One-touch checkout</h6>
            </button>
          </section>

          {/* Card Details */}
          <div className="flex flex-col justify-center bg-[#F3EEFF] py-10 rounded-2xl w-full">
            <label htmlFor="cardholder-name" className="mx-auto w-9/10">
              CARDHOLDER NAME
            </label>
            <InputField
              id="cardholder-name"
              placeholder="e.g. John Doe"
              additionalClasses="mx-auto w-9/10 h-12 border-0 bg-[#DDD9FF]"
            ></InputField>

            <label htmlFor="card-number" className="mx-auto w-9/10">
              CARD NUMBER
            </label>
            <InputField
              id="card-number"
              placeholder="0000 0000 0000 0000"
              additionalClasses="mx-auto w-9/10 h-12 border-0 bg-[#DDD9FF]"
            ></InputField>

            {/* Expiry date and cvv container */}
            <div className="flex justify-between gap-5 mx-auto w-9/10">
              <div className="flex flex-col w-1/2">
                <label htmlFor="expiry-date">EXPIRY DATE</label>
                <InputField
                  id="expiry-date"
                  placeholder="MM/YY"
                  additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
                ></InputField>
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="cvv">CVV</label>
                <InputField
                  id="cvv"
                  placeholder="•••"
                  additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
                ></InputField>
              </div>
            </div>
          </div>

          {/* Discount Details */}
          <label htmlFor="discount-code">Discount Code</label>
          <div className="flex gap-5 w-full">
            <InputField
              id="discount-code"
              placeholder="Enter code"
              additionalClasses="w-full h-12 border-0 bg-[#ffff]"
            ></InputField>
            <MiniButton
              text="Apply"
              additionalClassName="!bg-[#E3DFFF] !text-[#0050D4] rounded-xl"
            />
          </div>
        </div>

        {/* Right main container */}
        <div className="">
          <h1>Hello</h1>
        </div>
      </main>

      <footer>
        <h1>Hello</h1>
      </footer>
    </>
  );
}

export default CheckoutPage;
