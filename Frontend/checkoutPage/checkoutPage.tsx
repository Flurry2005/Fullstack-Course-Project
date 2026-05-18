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
    const serviceFeeInCents = Math.round(priceInCents * 0.1);
    setServiceFee(serviceFeeInCents / 100);
  }, [price]);

  const selectedTier = searchParams.get("tier") || "Basic";
  const tierKey = selectedTier.toLowerCase() as "basic" | "standard" | "premium";
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

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 lg:px-10">
        <section>
          <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
            Finalize your order
          </h1>
          <p className="mt-2 text-base font-medium text-[#77718a]">
            Review your details and complete your purchase.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-8">
            <section className="rounded-xl border border-[#eadfff] bg-white p-6 shadow-sm">
              <div className="grid gap-6 md:grid-cols-[190px_minmax(0,1fr)]">
                <img
                  src={
                    gig?.primaryImagePreview ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDiuac9hOFukYa8yTFGqKoezMiDw89NQG6KQ&s"
                  }
                  className="h-36 w-full rounded-lg object-cover md:h-36"
                  alt="Gig preview"
                />

                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-semibold">
                    {gig?.title || "Custom 3D Low-Poly Asset"}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#696477]">
                    {gig?.description ||
                      "High-quality, optimized low-poly models tailored for digital environments and game engines."}
                  </p>

                  <div className="mt-4 grid gap-2 text-sm font-semibold text-[#595371] sm:grid-cols-2">
                    {includedFeatures.map((feature) => (
                      <div className="flex items-start gap-2" key={feature}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8651ec]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-8 h-px bg-[#eee6ff]" />

              <h3 className="text-lg font-semibold">How it works</h3>
              <div className="mt-8 grid gap-8 text-center md:grid-cols-3">
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eadcff] text-base font-bold text-[#6f3be3]">
                      {item.step}
                    </div>
                    <h4 className="mt-4 text-sm font-bold">{item.title}</h4>
                    <p className="mt-2 max-w-56 text-sm font-medium leading-5 text-[#7c7689]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold">Client reflections</h3>
              {reviews.length ? (
                <div className="mt-6 grid items-start gap-6 md:grid-cols-2">
                  {reviews.map((review, index) => {
                    const reviewKey = `${review.username}-${index}`;
                    const isExpanded = expandedReviews[reviewKey];
                    const shouldShowToggle = (review.comment?.length ?? 0) > 150;
                    const rating = Math.max(
                      0,
                      Math.min(5, Number(review.rating) || 0),
                    );

                    return (
                      <article
                        className="flex min-h-40 self-start rounded-lg border border-[#eadfff] bg-[#f8f3ff] p-5 flex-col"
                        key={reviewKey}
                      >
                        <div className="flex gap-1 text-[#ffb21c]">
                          {Array.from({ length: rating }).map((_, index) => (
                            <Star
                              className="h-4 w-4 fill-current"
                              key={index}
                            />
                          ))}
                        </div>
                        <p
                          className={`mt-2 break-words text-sm font-semibold italic leading-6 text-[#777082] ${isExpanded
                              ? "flex-none"
                              : "flex-1 overflow-hidden"
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
                            className="mt-2 w-fit cursor-pointer text-sm font-bold text-[#8759f2] transition-colors hover:text-[#6f36e2]"
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
                          className="mt-auto flex w-fit items-center gap-3 rounded-lg pr-2 pt-4 text-sm font-bold text-[#8759f2] transition-colors hover:text-[#6f36e2]"
                          to={`/profile/${review.username}`}
                        >
                          <img
                            alt={review.username}
                            className="h-9 w-9 rounded-full object-cover"
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
                <div className="mt-6 rounded-lg border border-[#eadfff] bg-[#f8f3ff] px-5 py-6 text-sm font-medium text-[#77718a]">
                  No reviews have been submitted for this service yet.
                </div>
              )}
            </section>

            <section className="flex flex-wrap justify-center gap-8 pb-6 text-sm font-semibold text-[#8b8794]">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                SSL Secure
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Protected
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-5 w-5" />
                Encrypted Payment
              </div>
            </section>
          </div>

          <aside className="rounded-xl bg-[#f0eaff] p-8 shadow-md lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-[#716b82]">
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
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[#7b7193] transition-colors hover:text-[#6f36e2] focus:text-[#6f36e2] focus:outline-none"
                      type="button"
                    >
                      <CircleHelp className="h-4 w-4" />
                    </button>
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-[#1f1b4d] px-3 py-2 text-xs font-medium leading-5 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                      Our platform takes a 10% service fee to support secure
                      payments, hosting, and buyer protection.
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-[#302a5e]">
                  {formatCurrency(serviceFee)}
                </h4>
              </section>
            </div>

            <div className="my-5 h-px bg-[#d9cfff]" />

            <section>
              <h3 className="text-xs font-semibold uppercase text-[#746d83]">
                Total Amount
              </h3>
              <p className="mt-1 text-4xl font-semibold text-[#6f36e2]">
                {formatCurrency(totalPrice)}
              </p>
            </section>

            <section className="mt-6">
              <GlowingButton
                outline={false}
                onClick={handlePay}
                additionalClasses="w-full! h-13! mx-auto rounded-lg! shadow-md font-semibold gap-2"
              >
                Confirm and Pay <ArrowRight className="h-5 w-5" />
              </GlowingButton>
            </section>

            <section className="mt-6 rounded-lg bg-white/70 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#19c7f3] text-white">
                  <i className="fa-solid fa-shield-halved text-xl"></i>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm font-bold">Secure Stripe checkout</p>
                  <p className="text-xs font-semibold text-[#8b8497]">
                    Encrypted payment processing
                  </p>
                </div>
              </div>
            </section>

            <section className="pt-6">
              <p className="text-center text-xs font-medium leading-5 text-[#776f84]">
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
