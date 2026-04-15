import InputField from "../Components/General/InputField";
import MiniButton from "../Components/HomePageComponents/MiniButtonLink";
import "../App.css";
import NavBar from "../NavBar";
import GlowingButton from "../Components/General/GlowingButton";
import { useState } from "react";
import Footer from "../Footer";

function CheckoutPage() {

    const [selected, setSelected] = useState<"card" | "paypal" | "applePay" | null>("card");

    return (
        <div className="min-h-screen flex flex-col bg-[#f9f5ff]">

            <NavBar />

            {/* Main container */}
            <main className="flex flex-1 justify-between gap-5 px-5 items-start pb-5">

                {/* Left main container */}
                <div className="flex flex-col w-7/10 gap-5">
                    <section className="py-10">
                        <h1 className="text-3xl">Finalize your order</h1>
                        <h3>Review your details and complete your purchase.</h3>
                    </section>

                    {/* Payment Method */}
                    <h2 className="text-2xl">Payment Method</h2>
                    <section className="flex w-full gap-5">
                        <button
                            onClick={() => setSelected("card")}
                            className={`bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col ${selected !== "card"
                                ? "border border-transparent"
                                : "border-2 border-blue-500"
                                }`}
                        >
                            <i className="fa-regular fa-credit-card text-2xl"></i>
                            <h3 className="text-left">Credit/Debit Card, Amex</h3>
                            <h4 className="text-left">Visa, Mastercard</h4>
                        </button>

                        <button
                            onClick={() => setSelected("paypal")}
                            className={`bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col ${selected !== "paypal"
                                ? "border border-transparent"
                                : "border-2 border-blue-500"
                                }`}
                        >
                            <i className="fa-brands fa-paypal text-2xl"></i>
                            <h3 className="text-left">PayPal</h3>
                            <h4 className="text-left">Direct wallet transfer</h4>
                        </button>

                        <button
                            onClick={() => setSelected("applePay")}
                            className={`bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col ${selected !== "applePay"
                                ? "border border-transparent"
                                : "border-2 border-blue-500"
                                }`}
                        >
                            <img src="/swish.png" alt="Swish" className="w-25 h-20" />
                            <h3 className="text-left">Swish</h3>
                            <h4 className="text-left">Pay with Swish</h4>
                        </button>
                    </section>

          {/* Card Details */}
          <div className="flex flex-col justify-center gap-5 bg-[#F3EEFF] py-10 rounded-2xl w-full">
            <section className="mx-auto w-9/10">
              <label htmlFor="cardholder-name">CARDHOLDER NAME</label>
              <InputField
                id="cardholder-name"
                placeholder="e.g. John Doe"
                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
              ></InputField>
            </section>

            <section className="mx-auto w-9/10">
              <label htmlFor="card-number" className="mx-auto w-9/10">
                CARD NUMBER
              </label>
              <InputField
                id="card-number"
                placeholder="0000 0000 0000 0000"
                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
              ></InputField>
            </section>

            <section className="mx-auto w-9/10">
              {/* Expiry date and cvv container */}
              <div className="flex justify-between gap-5 mx-auto">
                <div className="flex flex-col w-full">
                  <label htmlFor="expiry-date">EXPIRY DATE</label>
                  <InputField
                    id="expiry-date"
                    placeholder="MM/YY"
                    additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
                  ></InputField>
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="cvv">CVV</label>
                  <InputField
                    id="cvv"
                    placeholder="•••"
                    additionalClasses="w-full h-12 border-0 bg-[#DDD9FF]"
                  ></InputField>
                </div>
              </div>
            </section>
          </div>

          {/* Discount Details */}
          <section className="flex flex-col gap-2">
            <label htmlFor="discount-code" className="text-2xl">
              Discount Code
            </label>
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
          </section>
        </div>

        {/* Right main container */}
        <div className="flex flex-col gap-5 pt-10 w-3/10">
          <div className="bg-[#F3EEFF] rounded-2xl w-full h-auto overflow-hidden py">
            <div className="p-5">
              <img
                src="/HomePage/goon.jpg"
                className="rounded-2xl w-full h-5/20"
              ></img>
            </div>

            {/* Checkout prices */}
            <div>
              <section className="flex justify-between px-5 py-2">
                <h4>Service Tier</h4>
                <h4>Cooking</h4>
              </section>
              <section className="flex justify-between px-5 py-2">
                <h4>Standard Price</h4>
                <h4>$150.00</h4>
              </section>
              <section className="flex justify-between px-5 py-2">
                <h4>Service Fee</h4>
                <h4>$12.50</h4>
              </section>

              <section>
                <h3 className="px-5 pt-5">TOTAL AMOUNT</h3>
                <h2 className="px-5 text-3xl">$162.50</h2>
              </section>
            </div>

            {/* Pay button */}
            <section className="p-5">
              <GlowingButton
                outline={false}
                onClick={() => {}}
                additionalClasses="w-full! h-15! mx-auto"
              >
                Confirm and Pay
              </GlowingButton>
            </section>

            {/* Purchase details under pay button */}
            <div>
              <section className="flex justify-between p-5">
                <div className="flex">
                  <div className="flex justify-center items-center bg-[#91FEEF] rounded-4xl w-12 h-12">
                    <i className="text-2xl fa-solid fa-shield-halved"></i>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs">SECURE</p>
                    <p className="text-xs">CHECKOUT</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex justify-center items-center bg-[#DCC9FF] rounded-4xl w-12 h-12">
                    <i className="text-2xl align-middle fa-solid fa-money-check-dollar"></i>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-xs">MONEY BACK </p>
                    <p className="text-xs">GUARANTEE</p>
                  </div>
                </div>
              </section>

                            <section className="bg-[#E9E5FF] p-5">
                                <p className="text-xs text-center">By confirming your payment, you agree to the Atelier Market Terms of
                                    Service and Privacy Policy. Digital deliverables will be transferred upon completion</p>
                            </section>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />

        </div>
    );
}

export default CheckoutPage;
