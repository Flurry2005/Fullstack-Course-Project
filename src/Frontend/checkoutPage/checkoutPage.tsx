import InputField from "../Components/General/InputField";
import MiniButton from "../Components/HomePageComponents/MiniButtonLink";
import "../app.css";
import NavBar from "../NavBar";

function CheckoutPage() {
    return (
        <>
            <NavBar />

            {/* Main container */}
            <main className="flex bg-[#f9f5ff] justify-between gap-5 px-5 h-screen">

                {/* Left main container */}
                <div className="flex flex-col w-7/10 gap-5">
                    <section className="py-10">
                        <h1 className="text-3xl">Finalize your order</h1>
                        <h3>Review your details and complete your purchase.</h3>
                    </section>
                    
                    {/* Payment Method */}
                    <h2 className="text-2xl">Payment Method</h2>
                    <section className="flex w-full gap-5">
                        <button className="bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col">
                            <i className="fa-regular fa-credit-card text-2xl"></i>
                            <h3 className="text-left">Credit/Debit Card, Amex</h3>
                            <h4 className="text-left">Visa, Mastercard</h4>
                        </button>

                        <button className="bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col">
                            <i className="fa-brands fa-paypal text-2xl"></i>
                            <h3 className="text-left">PayPal</h3>
                            <h4 className="text-left">Direct wallet transfer</h4>
                        </button>

                        <button className="bg-[#ffff] w-1/3 h-30 rounded-2xl p-5 flex flex-col">
                            <i className="fa-brands fa-apple-pay text-4xl"></i>
                            <h3 className="text-left">Apple Pay</h3>
                            <h4 className="text-left">One-touch checkout</h4>
                        </button>
                    </section>

                    {/* Card Details */}
                    <div className="flex flex-col justify-center bg-[#F3EEFF] w-full rounded-2xl py-10 gap-5">

                        <section className="mx-auto w-9/10">
                            <label htmlFor="cardholder-name">CARDHOLDER NAME</label>
                            <InputField
                                id="cardholder-name"
                                placeholder="e.g. John Doe"
                                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                            ></InputField>
                        </section>

                        <section className="mx-auto w-9/10">
                            <label htmlFor="card-number" className="mx-auto w-9/10" >CARD NUMBER</label>
                            <InputField
                                id="card-number"
                                placeholder="0000 0000 0000 0000"
                                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                            ></InputField>
                        </section>

                        <section className="mx-auto w-9/10">
                            {/* Expiry date and cvv container */}
                            <div className="flex justify-between mx-auto gap-5">
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
                        <label htmlFor="discount-code" className=" text-2xl">Discount Code</label>
                        <div className="flex w-full gap-5">
                            <InputField
                                id="discount-code"
                                placeholder="Enter code"
                                additionalClasses="w-full h-12 border-0 bg-[#ffff]"
                            ></InputField>
                            <MiniButton text="Apply" additionalClassName="!bg-[#E3DFFF] !text-[#0050D4] rounded-xl" />
                        </div>
                    </section>
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
