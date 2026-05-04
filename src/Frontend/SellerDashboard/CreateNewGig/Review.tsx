import type { Gig as NewGig } from "../../types/Gig";
import fish from "../../assets/fish.jpg";
import checkIcon from "../../assets/circle-check-req-icon.svg";
import { useState } from "react";

type ReviewProps = {
  newGig: NewGig;
  setSuccess: (value: boolean) => void;
  success: boolean;
};
function Review({ newGig, setSuccess, success }: ReviewProps) {
  const [TOS, setTOS] = useState(false);

  const publishGig = async () => {
    const header = { "Content-type": "Application/json" };
    const body = JSON.stringify(newGig);
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig"}`,
      { method: "POST", headers: header, body: body },
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) setSuccess(true);
  };

  return (
    <div className="flex flex-col gap-12">
      {success && (
        <div className="flex flex-col text-center gap-6">
          {" "}
          <h2 className="text-4xl">Success!</h2>
          <p>Your gig will be reviewed before it will be published.</p>
        </div>
      )}
      {!success && (
        <>
          <div className="text-center">
            <h2 className="text-4xl">Review & Publish </h2>
          </div>
          <div className="flex flex-col mx-auto gap-6 md:w-[75vw]">
            <div className="flex flex-col shadow-md border border-[#C7C4D8] bg-white rounded-2xl overflow-hidden">
              <img
                src={fish}
                className="w-full h-75"
                style={{ borderRadius: 0 }}
              />
              <div className="flex flex-col gap-1 px-6 py-6">
                <div className="flex items-center gap-2 font-semibold text-[#3525CD]">
                  <span>{newGig.category?.main}</span>
                  <span>•</span>
                  <span>{newGig.category?.sub}</span>
                </div>
                <h3 className="text-3xl text-[#131B2E] font-semibold">
                  {newGig?.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl text-[#131B2E]  font-semibold">
                  Description
                </h3>
                <p>{newGig?.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
              <div className="flex flex-col gap-3">
                <h3 className="text-xl text-[#131B2E]  font-semibold">
                  Gallery
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl px-6 text-[#131B2E] font-semibold">
                Pricing & Packages
              </h3>
              <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
                {newGig.basic?.price && (
                  <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">BASIC</h3>
                        <span className="text-3xl font-semibold text-[#131B2E]">
                          ${newGig?.basic?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          Basic features
                        </span>

                        {(newGig?.basic?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.standard?.features ?? []).map((e, id) => (
                          <span
                            className="opacity-25 flex gap-2 items-center"
                            key={id}
                          >
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.premium?.features ?? []).map((e, id) => (
                          <span
                            className="opacity-25 flex gap-2 items-center"
                            key={id}
                          >
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {newGig.standard?.price && (
                  <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">STANDARD</h3>
                        <span className="text-3xl font-semibold text-[#131B2E]">
                          ${newGig?.standard?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          Basic features
                        </span>

                        {(newGig?.basic?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.standard?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.premium?.features ?? []).map((e, id) => (
                          <span
                            className="opacity-25 flex gap-2 items-center"
                            key={id}
                          >
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {newGig.premium?.price && (
                  <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#464555]">PREMIUM</h3>
                        <span className="text-3xl font-semibold text-[#131B2E]">
                          ${newGig?.premium?.price}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">
                          Basic features
                        </span>

                        {(newGig?.basic?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.standard?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                        {(newGig?.premium?.features ?? []).map((e, id) => (
                          <span className="flex gap-2 items-center" key={id}>
                            <img src={checkIcon} className="w-5 h-5" /> {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6 shadow-md border border-[#C7C4D8] bg-white p-6 rounded-2xl">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl text-[#131B2E]  font-semibold">
                    Search Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {newGig.tags &&
                      newGig.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="text-[#54647A] font-medium gap-1 flex items-center bg-[#D0E1FB] px-6 py-1 rounded-lg min-h-9"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <span className="flex gap-3 place-self-center items-center">
              <input
                type="checkbox"
                name="terms"
                onClick={() => setTOS((prev) => !prev)}
                className="bg-white shrink-0 border-[#C7C4D8] h-4 w-4 border appearance-none checked:bg-[#3323CC]"
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
