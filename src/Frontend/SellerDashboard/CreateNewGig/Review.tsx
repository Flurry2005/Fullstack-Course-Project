import type { Gig as NewGig } from "../../types/Gig";
import fish from "../../assets/fish.jpg";
import checkIcon from "../../assets/circle-check-req-icon.svg";
import { useState } from "react";

type ReviewProps = {
  newGig: NewGig;
  setSuccess: (value: boolean) => void;
  success: boolean;
  primaryImagePreview: File | null;
  secondaryImagePreview: File | null;
  ternaryImagePreview: File | null;
};
function Review({
  newGig,
  setSuccess,
  success,
  primaryImagePreview,
  secondaryImagePreview,
  ternaryImagePreview,
}: ReviewProps) {
  const [TOS, setTOS] = useState(false);

  const publishGig = async () => {
    const formData = new FormData();

    formData.append("gig", JSON.stringify(newGig));

    if (primaryImagePreview) {
      formData.append("images", primaryImagePreview);
    }

    if (secondaryImagePreview) {
      formData.append("images", secondaryImagePreview);
    }

    if (ternaryImagePreview) {
      formData.append("images", ternaryImagePreview);
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_DEV === "true"
          ? "http://localhost:3000"
          : "https://fullstackapi.liamjorgensen.dev"
      }/api/gig`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );

    const data = await response.json();

    setSuccess(response.ok);
  };

  return (
    <div className="flex flex-col gap-12">
      {success && (
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl">Success!</h2>
          <p className="text-[#464555] text-xl">
            Your gig will be reviewed before it will be published.
          </p>
        </div>
      )}
      {!success && (
        <>
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-4xl">Review & Publish</h2>
            <p className="text-[#464555] text-xl">
              Double-check your details and publish your gig when you're ready.
            </p>
          </div>
          <div className="flex flex-col gap-6 mx-auto md:w-[50vw]">
            <div className="flex flex-col bg-white shadow-md border border-[#ACA8D7]/15 rounded-2xl overflow-hidden">
              <img
                src={
                  primaryImagePreview
                    ? URL.createObjectURL(primaryImagePreview)
                    : fish
                }
                className="w-full h-75"
                style={{ borderRadius: 0 }}
              />
              <div className="flex flex-col gap-1 px-6 py-6">
                <div className="flex items-center gap-2 font-semibold text-[#3525CD]">
                  <span>{newGig.category?.main}</span>
                  <span>{">"}</span>
                  <span>{newGig.category?.sub}</span>
                </div>
                <h3 className="font-semibold text-[#131B2E] text-3xl">
                  {newGig?.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-[#131B2E] text-xl">
                  Description
                </h3>
                <p>{newGig?.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-[#131B2E] text-xl">
                  Gallery
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="px-6 font-semibold text-[#131B2E] text-xl">
                Pricing & Packages
              </h3>
              <div className="gap-3 grid grid-cols-1 md:grid-cols-3">
                {newGig.basic?.price && (
                  <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">BASIC</h3>
                        <span className="font-semibold text-[#131B2E] text-3xl">
                          ${newGig?.basic?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm">
                          Basic features
                        </span>

                        {(newGig?.basic?.features ?? []).map((e, id) => (
                          <span
                            key={id}
                            className="flex items-start gap-2 min-w-0"
                          >
                            <img src={checkIcon} className="w-5 h-5" />
                            <span className="break-all wrap-break-word leading-tight">
                              {e}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {newGig.standard?.price && (
                  <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#C7C4D8] rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">STANDARD</h3>
                        <span className="font-semibold text-[#131B2E] text-3xl">
                          ${newGig?.standard?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm">
                          Basic features
                        </span>

                        {(newGig?.standard?.features ?? []).map((e, id) => (
                          <span
                            key={id}
                            className="flex items-start gap-2 min-w-0"
                          >
                            <img src={checkIcon} className="w-5 h-5" />
                            <span className="break-all wrap-break-word leading-tight">
                              {e}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {newGig.premium?.price && (
                  <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#C7C4D8] rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">PREMIUM</h3>
                        <span className="font-semibold text-[#131B2E] text-3xl">
                          ${newGig?.premium?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm">
                          Basic features
                        </span>

                        {(newGig?.premium?.features ?? []).map((e, id) => (
                          <span
                            key={id}
                            className="flex items-start gap-2 min-w-0"
                          >
                            <img src={checkIcon} className="w-5 h-5" />
                            <span className="break-all wrap-break-word leading-tight">
                              {e}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-[#131B2E] text-xl">
                    Search Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {newGig.tags &&
                      newGig.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="flex items-center gap-1 bg-[#D0E1FB] px-6 py-1 rounded-lg min-h-9 font-medium text-[#54647A]"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="flex items-center place-self-center gap-3">
              <input
                type="checkbox"
                name="terms"
                onClick={() => setTOS((prev) => !prev)}
                className="bg-white checked:bg-[#3323CC] border border-[#C7C4D8] w-4 h-4 appearance-none shrink-0"
              />
              <label htmlFor="terms">I agree to the terms of service</label>
            </span>
            <button
              className={`bg-[#4F46E5] ${TOS ? "opacity-100 cursor-pointer" : "opacity-25 cursor-auto"}  py-3 text-white font-semibold rounded-lg`}
              disabled={!TOS}
              onClick={() => publishGig()}
            >
              Publish Gig
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Review;
