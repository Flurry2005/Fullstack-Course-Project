import "../App.css";
import GlowingButton from "../Components/General/GlowingButton";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { API_BASE, DEFAULT_PROFILE_IMAGE } from "../ProfilePage/profileUtils";
import { Link, useSearchParams } from "react-router-dom";
import type { Gig } from "../types/Gig";
import NavBar from "../NavBar/NavBar";
import { fetchProfile } from "../utils/GetProfile";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  LockKeyhole,
  Shield,
  Star,
} from "lucide-react";

function CheckoutPage() {
  const [searchParams] = useSearchParams();

  const [gig, setGig] = useState<Gig>();

  const [price, setPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [profilePictures, setProfilePictures] = useState<
    Record<string, string>
  >({});
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});

  const handlePay = async () => {
    const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        gigId: searchParams.get("gigId"),
        tier: searchParams.get("tier"),
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
    const priceInCents = Math.round(price * 100);
    const serviceFeeInCents = Math.round(priceInCents * 0.05);
    setServiceFee(serviceFeeInCents / 100);
  }, [price]);

  const selectedTier = searchParams.get("tier") || "Basic";
  const tierKey = selectedTier.toLowerCase() as
    | "basic"
    | "standard"
    | "premium";
  const selectedPackage = gig?.[tierKey];
  const includedFeatures = selectedPackage?.features?.length
    ? selectedPackage.features.slice(0, 4)
    : [
        "High-resolution renders",
        `${selectedPackage?.delivery || "24-hour"} delivery`,
        "Commercial license",
        "Source files included",
      ];
  const totalPrice = price + serviceFee;
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  const reviews =
    gig?.reviews
      ?.slice()
      .sort((firstReview, secondReview) => {
        const ratingDifference =
          (secondReview.rating || 0) - (firstReview.rating || 0);

        if (ratingDifference !== 0) return ratingDifference;

        return (
          new Date(secondReview.createdAt || 0).getTime() -
          new Date(firstReview.createdAt || 0).getTime()
        );
      })
      .slice(0, 2) ?? [];

  useEffect(() => {
    const usernames = [
      ...new Set(reviews.map((review) => review.username).filter(Boolean)),
    ];

    if (!usernames.length) return;

    Promise.all(
      usernames.map(async (username) => {
        const profile = await fetchProfile(username);
        return [username, profile?.profilePictureUrl || DEFAULT_PROFILE_IMAGE];
      }),
    ).then((entries) => {
      setProfilePictures(Object.fromEntries(entries));
    });
  }, [gig]);

  return (
    <div className="flex flex-col bg-[#fbf7ff] min-h-screen text-[#1f1b4d]">
      <NavBar />

      <main className="flex flex-col flex-1 gap-8 mx-auto px-6 lg:px-10 py-10 w-full max-w-7xl">
        <section>
          <h1 className="font-semibold text-3xl md:text-4xl tracking-normal">
            Finalize your order
          </h1>
          <p className="mt-2 font-medium text-[#77718a] text-base">
            Review your details and complete your purchase.
          </p>
        </section>

        <div className="items-start gap-6 grid lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-8">
            <section className="bg-white shadow-sm p-6 border border-[#eadfff] rounded-xl">
              <div className="gap-6 grid md:grid-cols-[190px_minmax(0,1fr)]">
                <img
                  src={
                    gig?.primaryImagePreview ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDiuac9hOFukYa8yTFGqKoezMiDw89NQG6KQ&s"
                  }
                  className="rounded-lg w-full h-36 md:h-36 object-cover"
                  alt="Gig preview"
                />

                <div className="flex flex-col justify-center">
                  <h2 className="font-semibold text-2xl">
                    {gig?.title || "Custom 3D Low-Poly Asset"}
                  </h2>
                  <p className="mt-2 max-w-2xl font-medium text-[#696477] text-sm leading-6">
                    {gig?.description ||
                      "High-quality, optimized low-poly models tailored for digital environments and game engines."}
                  </p>

                  <div className="gap-2 grid sm:grid-cols-2 mt-4 font-semibold text-[#595371] text-sm">
                    {includedFeatures.map((feature) => (
                      <div className="flex items-start gap-2" key={feature}>
                        <CheckCircle2 className="mt-0.5 w-4 h-4 text-[#8651ec] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#eee6ff] my-8 h-px" />

              <h3 className="font-semibold text-lg">How it works</h3>
              <div className="gap-8 grid md:grid-cols-3 mt-8 text-center">
                {[
                  {
                    step: "1",
                    title: "Review Details",
                    text: "Ensure all selected features meet your requirements.",
                  },
                  {
                    step: "2",
                    title: "Complete Payment",
                    text: "Secure transaction via Stripe's encrypted gateway.",
                  },
                  {
                    step: "3",
                    title: "Seller Notified",
                    text: "The seller receives your order and can begin delivering the service.",
                  },
                ].map((item) => (
                  <div className="flex flex-col items-center" key={item.step}>
                    <div className="flex justify-center items-center bg-[#eadcff] rounded-full w-10 h-10 font-bold text-[#6f3be3] text-base">
                      {item.step}
                    </div>
                    <h4 className="mt-4 font-bold text-sm">{item.title}</h4>
                    <p className="mt-2 max-w-56 font-medium text-[#7c7689] text-sm leading-5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-xl">Client reflections</h3>
              {reviews.length ? (
                <div className="items-start gap-6 grid md:grid-cols-2 mt-6">
                  {reviews.map((review, index) => {
                    const reviewKey = `${review.username}-${index}`;
                    const isExpanded = expandedReviews[reviewKey];
                    const shouldShowToggle =
                      (review.comment?.length ?? 0) > 150;
                    const rating = Math.max(
                      0,
                      Math.min(5, Number(review.rating) || 0),
                    );

                    return (
                      <article
                        className="flex flex-col self-start bg-[#f8f3ff] p-5 border border-[#eadfff] rounded-lg min-h-40"
                        key={reviewKey}
                      >
                        <div className="flex gap-1 text-[#ffb21c]">
                          {Array.from({ length: rating }).map((_, index) => (
                            <Star
                              className="fill-current w-4 h-4"
                              key={index}
                            />
                          ))}
                        </div>
                        <p
                          className={`mt-2 break-words text-sm font-semibold italic leading-6 text-[#777082] ${
                            isExpanded ? "flex-none" : "flex-1 overflow-hidden"
                          }`}
                          style={
                            isExpanded
                              ? undefined
                              : {
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                }
                          }
                        >
                          {review.comment || ""}
                        </p>
                        {shouldShowToggle && (
                          <button
                            className="mt-2 w-fit font-bold text-[#8759f2] hover:text-[#6f36e2] text-sm transition-colors cursor-pointer"
                            onClick={() =>
                              setExpandedReviews((current) => ({
                                ...current,
                                [reviewKey]: !current[reviewKey],
                              }))
                            }
                            type="button"
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        )}
                        <Link
                          className="flex items-center gap-3 mt-auto pt-4 pr-2 rounded-lg w-fit font-bold text-[#8759f2] hover:text-[#6f36e2] text-sm transition-colors"
                          to={`/profile/${review.username}`}
                        >
                          <img
                            alt={review.username}
                            className="rounded-full w-9 h-9 object-cover"
                            src={
                              profilePictures[review.username] ||
                              DEFAULT_PROFILE_IMAGE
                            }
                          />
                          <span>{review.username}</span>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[#f8f3ff] mt-6 px-5 py-6 border border-[#eadfff] rounded-lg font-medium text-[#77718a] text-sm">
                  No reviews have been submitted for this service yet.
                </div>
              )}
            </section>

            <section className="flex flex-wrap justify-center gap-8 pb-6 font-semibold text-[#8b8794] text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                SSL Secure
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy Protected
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole className="w-5 h-5" />
                Encrypted Payment
              </div>
            </section>
          </div>

          <aside className="lg:top-24 lg:sticky bg-[#f0eaff] shadow-md p-8 rounded-xl">
            <h2 className="font-semibold text-xl">Order Summary</h2>

            <div className="flex flex-col gap-3 mt-5 font-medium text-[#716b82] text-sm">
              <section className="flex justify-between gap-5">
                <h4>Service Tier</h4>
                <h4 className="font-semibold text-[#302a5e]">{selectedTier}</h4>
              </section>

              <section className="flex justify-between gap-5">
                <h4>{selectedTier} Price</h4>
                <h4 className="font-semibold text-[#302a5e]">
                  {formatCurrency(price)}
                </h4>
              </section>

              <section className="flex justify-between gap-5">
                <div className="flex items-center gap-1.5">
                  <h4>Service Fee</h4>
                  <div className="group relative flex">
                    <button
                      aria-label="What is the service fee?"
                      className="flex justify-center items-center rounded-full focus:outline-none w-4 h-4 text-[#7b7193] hover:text-[#6f36e2] focus:text-[#6f36e2] transition-colors"
                      type="button"
                    >
                      <CircleHelp className="w-4 h-4" />
                    </button>
                    <div className="bottom-full left-1/2 z-20 absolute bg-[#1f1b4d] opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 shadow-lg mb-2 px-3 py-2 rounded-lg w-56 font-medium text-white text-xs leading-5 transition-opacity -translate-x-1/2 pointer-events-none">
                      Our platform takes a 5% service fee to support secure
                      payments, hosting, and buyer protection.
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-[#302a5e]">
                  {formatCurrency(serviceFee)}
                </h4>
              </section>
            </div>

            <div className="bg-[#d9cfff] my-5 h-px" />

            <section>
              <h3 className="font-semibold text-[#746d83] text-xs uppercase">
                Total Amount
              </h3>
              <p className="mt-1 font-semibold text-[#6f36e2] text-4xl">
                {formatCurrency(totalPrice)}
              </p>
            </section>

            <section className="mt-6">
              <GlowingButton
                outline={false}
                onClick={handlePay}
                additionalClasses="w-full! h-13! mx-auto rounded-lg! shadow-md font-semibold gap-2"
              >
                Confirm and Pay <ArrowRight className="w-5 h-5" />
              </GlowingButton>
            </section>

            <section className="bg-white/70 mt-6 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex justify-center items-center bg-[#19c7f3] rounded-lg w-10 h-10 text-white">
                  <i className="text-xl fa-solid fa-shield-halved"></i>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-bold text-sm">Secure Stripe checkout</p>
                  <p className="font-semibold text-[#8b8497] text-xs">
                    Encrypted payment processing
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-6">
              <p className="font-medium text-[#776f84] text-xs text-center leading-5">
                By confirming your payment, you agree to the OurStore Terms of
                Service and Privacy Policy. Digital deliverables will be
                transferred upon completion.
              </p>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
