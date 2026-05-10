import InputField from "../Components/General/InputField";
import "../App.css";
import NavBar from "../NavBar";
import GlowingButton from "../Components/General/GlowingButton";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { API_BASE } from "../ProfilePage/profileUtils";
import { useSearchParams } from "react-router-dom";
import type { Gig } from "../types/Gig";

function CheckoutPage() {
  const [selected] = useState<"card" | "paypal" | "swish" | null>("card");

  const [searchParams] = useSearchParams();

  const [gig, setGig] = useState<Gig>();

  const [price, setPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  // FORM STATES
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePay = async () => {
    if (selected !== "card") {
      alert("Only card payments are connected right now.");
      return;
    }

    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        gigId: searchParams.get("gigId"),
        tier: searchParams.get("tier"),

        billing: {
          email,
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          country,
          zipCode,
          city,
          state,
          phoneNumber,
        },
      }),

      credentials: "include",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Could not start checkout.");
    }
  };

  // get gig by id
  const getGig = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/"}${searchParams.get("gigId")}`,
    );
    const data = await response.json();
    console.log(data);
    response.ok && setGig(data);
  };

  // get gig on mount
  useEffect(() => {
    getGig();
  }, []);

  // get price when gig has been fetched
  useEffect(() => {
    if (!gig) return;

    switch (searchParams.get("tier")?.toLowerCase()) {
      case "basic": {
        setPrice(Number(gig.basic!.price!));

        break;
      }

      case "standard": {
        setPrice(Number(gig.standard!.price!));

        break;
      }

      case "premium": {
        setPrice(Number(gig.premium!.price!));

        break;
      }
    }
  }, [gig]);

  // set service fee when price is updated
  useEffect(() => {
    setServiceFee(price * 0.1);
  }, [price]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
      <NavBar />

      <main className="flex flex-1 justify-between gap-5 px-5 items-start pb-5">
        {/* Left main container */}
        <div className="flex flex-col w-7/10 gap-5">
          <section className="py-10">
            <h1 className="text-3xl">Finalize your order</h1>
            <h3>Review your details and complete your purchase.</h3>
          </section>

          <h2 className="text-2xl">Billing information</h2>

          <div className="flex flex-col justify-center gap-5 bg-[#F3EEFF] py-10 w-full rounded-2xl">
            <section className="mx-auto w-9/10">
              <label htmlFor="email">Email Address</label>
              <InputField
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. Username@gmail.com"
                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
              />
            </section>

            <section className="mx-auto w-9/10">
              <div className="flex justify-between gap-5 mx-auto">
                <section className="flex flex-col w-full">
                  <label htmlFor="user_firstname">First name</label>
                  <InputField
                    id="user_firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>

                <section className="flex flex-col w-full">
                  <label htmlFor="user_lastname">Last name</label>
                  <InputField
                    id="user_lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>
              </div>
            </section>

            <section className="mx-auto w-9/10">
              <div className="flex justify-between gap-5 mx-auto">
                <section className="flex flex-col w-full">
                  <label htmlFor="user_address_nr1">Address Line 1</label>
                  <InputField
                    id="user_address_nr1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g Stockrosvägen 8"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>

                <section className="flex flex-col w-full">
                  <label htmlFor="user_address_nr2">Address Line 2</label>
                  <InputField
                    id="user_address_nr2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="e.g. Solhällegatan 11"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>
              </div>
            </section>

            <section className="mx-auto w-9/10">
              <div className="flex justify-between gap-5 mx-auto">
                <section className="flex flex-col w-full">
                  <label htmlFor="user_country">Country</label>
                  <InputField
                    id="user_country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. SE"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>

                <section className="flex flex-col w-full">
                  <label htmlFor="user_zip_code">Zip Code</label>
                  <InputField
                    id="user_zip_code"
                    value={zipCode}
                    type="number"
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g. 24747"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>
              </div>
            </section>

            <section className="mx-auto w-9/10">
              <div className="flex justify-between gap-5 mx-auto">
                <section className="flex flex-col w-full">
                  <label htmlFor="user_city">City</label>
                  <InputField
                    id="user_city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Flyinge"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>

                <section className="flex flex-col w-full">
                  <label htmlFor="user_state">State</label>
                  <InputField
                    id="user_state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Lund"
                    additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
                  />
                </section>
              </div>
            </section>

            <section className="mx-auto w-9/10">
              <label htmlFor="user_phone_number">Mobile Phone</label>
              <InputField
                id="user_phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +46 073-622-06-48"
                additionalClasses="mx-auto w-full h-12 border-0 bg-[#DDD9FF]"
              />
            </section>
          </div>
        </div>

        {/* Right main container */}
        <div className="flex flex-col gap-5 pt-10 w-3/10">
          <div className="bg-[#F3EEFF] rounded-2xl w-full h-auto overflow-hidden">
            <div className="p-5">
              <img
                src={
                  gig?.primaryImagePreview ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDiuac9hOFukYa8yTFGqKoezMiDw89NQG6KQ&s"
                }
                className="rounded-2xl w-full"
                alt="Gig preview"
              />
            </div>

            <div>
              <section className="flex justify-between px-5 py-2">
                <h4>Service Tier</h4>
                <h4>{searchParams.get("tier")}</h4>
              </section>

              <section className="flex justify-between px-5 py-2">
                <h4>{searchParams.get("tier")} Price</h4>
                <h4>${price}</h4>
              </section>

              <section className="flex justify-between px-5 py-2">
                <h4>Service Fee</h4>
                <h4>${serviceFee}</h4>
              </section>

              <section>
                <h2 className="px-5 pt-5">TOTAL AMOUNT</h2>
                <h3 className="px-5 text-3xl">${price + serviceFee}</h3>
              </section>
            </div>

            <section className="p-5">
              <GlowingButton
                outline={false}
                onClick={handlePay}
                additionalClasses="w-full! h-15! mx-auto"
              >
                Confirm and Pay
              </GlowingButton>
            </section>

            <section className="flex justify-between p-5">
              <div className="flex">
                <div className="flex justify-center items-center bg-[#91FEEF] rounded-4xl w-12 h-12">
                  <i className="text-2xl fa-solid fa-shield-halved"></i>
                </div>

                <div className="flex flex-col justify-center p-2">
                  <p className="text-xs">STRIPE</p>
                  <p className="text-xs">CHECKOUT</p>
                </div>
              </div>
            </section>

            <section className="bg-[#E9E5FF] p-5">
              <p className="text-xs text-center">
                By confirming your payment, you agree to the Atelier Market
                Terms of Service and Privacy Policy. Digital deliverables will
                be transferred upon completion.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
