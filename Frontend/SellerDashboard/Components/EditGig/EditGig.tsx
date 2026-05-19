import Footer from "../../../Footer";
import { useParams, Link } from "react-router-dom";
import GoBackIcon from "../../../assets/go-back-arrow.svg";
import { useEffect, useRef, useState } from "react";
import type { Gig } from "../../../types/Gig";
import overViewIcon from "../../../assets/info-icon.svg";
import packageIcon from "../../../assets/package-icon.svg";
import removeImageicon from "../../../assets/x-icon.svg";
import descIcon from "../../../assets/description-icon.svg";
import EditButton from "./EditButton";
import PackageBar from "./PackageBar";
import pauseIcon from "../../../assets/pause-icon.svg";
import deleteIcon from "../../../assets/delete-icon.svg";
import shareIcon from "../../../assets/share-icon.svg";
import nextIcon from "../../../assets/next-icon.svg";
import galleryIcon from "../../../assets/image-regular-icon.svg";
import Overview from "./Overview";
import Pricing from "./Pricing";
import Confirm from "./Confirm";
import Delete from "./Delete";
import Description from "./Description";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../NavBar/NavBar";
import unpauseIcon from "../../../assets/play-icon.svg";
import checkIcon from "../../../assets/circle-check-req-icon.svg";

function formatGigUpdatedAt(updatedAt: unknown) {
  if (!updatedAt) return "Unknown";

  const timestamp = updatedAt as { toDate?: () => Date; seconds?: number };
  const date =
    updatedAt instanceof Date
      ? updatedAt
      : typeof timestamp.toDate === "function"
        ? timestamp.toDate()
        : typeof timestamp.seconds === "number"
          ? new Date(timestamp.seconds * 1000)
          : new Date(updatedAt as string | number);

  return Number.isNaN(date.getTime()) ? "Unknown" : date.toLocaleString();
}

function EditGig() {
  const navigate = useNavigate();
  const { gigId } = useParams();
  const [gig, setGig] = useState<Gig>();
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [overView, setOverview] = useState(false);
  const [desc, setDesc] = useState(false);
  const [pricing, setPricing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmConfirm, setConfirmConfirm] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const primaryImageRef = useRef<HTMLInputElement>(null);
  const secondaryImageRef = useRef<HTMLInputElement>(null);
  const ternaryImageRef = useRef<HTMLInputElement>(null);

  const [primaryImagePreview, setPrimaryImagePreview] = useState<
    File | null | string
  >(null);
  const [secondaryImagePreview, setSecondaryImagePreview] = useState<
    File | null | string
  >(null);
  const [ternaryImagePreview, setTernaryImagePreview] = useState<
    File | null | string
  >(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:5173" : "https://fullstack.liamjorgensen.dev"}/services/${gig?.category?.main_slug}/${gig?.category?.sub_slug}/${gig?._id}`,
    );
    setShowCopied(true);
  };

  useEffect(() => {
    if (!showCopied) return;

    const timer = window.setTimeout(() => setShowCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [showCopied]);

  const getGig = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/edit/"}${gigId}`,
      { credentials: "include" },
    );
    const data = (await response.json()) as Gig;
    setPrimaryImagePreview(
      data.primaryImagePreview ? data.primaryImagePreview : null,
    );
    setSecondaryImagePreview(
      data.secondaryImagePreview ? data.secondaryImagePreview : null,
    );
    setTernaryImagePreview(
      data.ternaryImagePreview ? data.ternaryImagePreview : null,
    );
    response.ok ? setGig(data) : navigate("/dashboard");
  };

  useEffect(() => {
    getGig();
  }, []);

  useEffect(() => {
    getGig();
  }, [deleteState]);

  useEffect(() => {
    if (!editState) {
      setOverview(false);
      setDeleteState(false);
      setConfirmConfirm(false);
      setDesc(false);
      setPricing(false);
    }
  }, [editState]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col bg-white p-6 border-[#E2E8F0] border-b">
        <div className="flex items-center">
          {" "}
          <Link to="/dashboard">
            <img src={GoBackIcon} className="w-10 h-14 cursor-pointer" />
          </Link>
          <h2 className="p-6 font-semibold text-3xl">Gig Details</h2>
          <button
            className={`${confirm ? "opacity-100" : "opacity-25"} ml-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6`}
            disabled={!confirm}
            onClick={() => setConfirmConfirm(true)}
          >
            Save changes
          </button>
        </div>
      </div>
      <div className="relative">
        {confirmConfirm && gig && (
          <Confirm
            getGig={getGig}
            primaryImagePreview={primaryImagePreview as File | null}
            secondaryImagePreview={secondaryImagePreview as File | null}
            ternaryImagePreview={ternaryImagePreview as File | null}
            gig={gig}
            setConfirm={setConfirm}
            setConfirmConfirm={setConfirmConfirm}
          />
        )}
        {overView && editState && gig && (
          <Overview
            gig={gig}
            setGig={setGig}
            setEditState={setEditState}
            setConfirm={setConfirm}
          />
        )}

        {desc && editState && gig && (
          <Description
            gig={gig}
            setGig={setGig}
            setEditState={setEditState}
            setConfirm={setConfirm}
          />
        )}

        {pricing && editState && gig && (
          <Pricing
            gig={gig}
            setGig={setGig}
            setEditState={setEditState}
            setConfirm={setConfirm}
          />
        )}
        {deleteState && gig && (
          <Delete getGig={getGig} gig={gig} setDeleteState={setDeleteState} />
        )}

        <main
          onClick={() => setEditState(false)}
          className={`flex ${editState || confirmConfirm || deleteState ? "opacity-10" : "opacity-100"} flex-col w-full bg-[#f9f5ff] p-6 gap-6`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-5 py-2 rounded-2xl {
                ${gig?.pending ? "bg-[#fffd7f]" : "bg-[#7fffd4]"} width: "fit-content" `}
              >
                <span className="inline-block bg-black mr-2 border rounded-full w-2 h-2 animate-pulse" />
                <span
                  className="text-black text-base"
                  style={{ lineHeight: "1" }}
                >
                  {gig?.pending ? "Pending" : "Live"}
                </span>
              </span>
              <span className="text-[#464555]">
                Last updated {formatGigUpdatedAt(gig?.updatedAt)}
              </span>
            </div>
            <h3 className="font-semibold text-[#131B2E] text-4xl">
              {gig?.title}
            </h3>
          </div>

          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
              <div className="flex flex-col bg-white shadow-md border-[#ACA8D7]/15 border-2 rounded-2xl">
                <div className="flex items-center border-b border-b-[#E2E7FF] w-full">
                  <div className="flex flex-wrap items-center gap-6 p-6 w-full">
                    <div className="flex gap-3">
                    <div className="flex justify-center items-center bg-[#E2E7FF] rounded-2xl w-16 h-16">
                      <img src={overViewIcon} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#131B2E] text-xl">Overview</span>
                      <span className="text-[#464555]">
                        Title, Category, Search Tags
                      </span>
                    </div>
                    </div>
                    <span
                      className="ml-auto"
                      onClick={(e) => {
                        (e.stopPropagation(),
                          e.preventDefault(),
                          setOverview(true),
                          setEditState(true));
                      }}
                    >
                      <EditButton />
                    </span>
                  </div>
                </div>

                <div className="flex items-center border-b border-b-[#E2E7FF] w-full">
                  <div className="flex flex-wrap items-center gap-6 p-6 w-full">
                    <div className="flex gap-3">
                    <div className="flex justify-center items-center bg-[#E2E7FF] rounded-2xl w-16 h-16">
                      <img src={packageIcon} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#131B2E] text-xl">
                        Pricing & Packages
                      </span>
                      <span className="text-[#464555]">
                        3-tier pricing strategy defined
                      </span>
                    </div>
                    </div>
                    <span
                      className="ml-auto"
                      onClick={(e) => {
                        (e.stopPropagation(),
                          e.preventDefault(),
                          setPricing(true),
                          setEditState(true));
                      }}
                    >
                      <EditButton />
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-full">
                  <div className="flex flex-wrap items-center gap-6 p-6 w-full">
                          <div className="flex gap-3">
                    <div className="flex justify-center items-center bg-[#E2E7FF] rounded-2xl w-16 h-16">
                      <img src={descIcon} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#131B2E] text-xl">
                        Description
                      </span>
                      <span className="text-[#464555]">Detailed brief</span>
                    </div>
                    </div>
                    <span
                      className="ml-auto"
                      onClick={(e) => {
                        (e.stopPropagation(),
                          e.preventDefault(),
                          setDesc(true),
                          setEditState(true));
                      }}
                    >
                      <EditButton />
                    </span>
                  </div>
                </div>
              </div>

              {/* Change pictures */}
              <div className="flex flex-col bg-white shadow-md border-[#ACA8D7]/15 border-2 rounded-2xl">
                <div className="flex flex-col gap-6 p-6">
                  <span className="flex items-center gap-3 text-[#131B2E] text-xl">
                    <img src={galleryIcon} className="w-10 h-10" />
                    Media gallery
                  </span>
                  {/* Image 1*/}
                  <div className="md:flex justify-center gap-6 grid">
                    <div
                      className={`relative flex flex-col justify-center items-center border-[#C7C4D8] border-2 border-dashed rounded-lg w-48 md:w-full  ${primaryImagePreview ? "" : "cursor-pointer"} `}
                      onClick={() => {
                        if (!primaryImagePreview)
                          primaryImageRef.current!.click();
                      }}
                    >
                      {primaryImagePreview && (
                        <img
                          src={removeImageicon}
                          className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                          onClick={() => {
                            setPrimaryImagePreview(null);
                            setConfirm(true);
                          }}
                        />
                      )}
                      <input
                        type="file"
                        ref={primaryImageRef}
                        id="SetImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPrimaryImagePreview(file);
                            setConfirm(true);
                          }
                        }}
                      />

                      <img
                        src={
                          primaryImagePreview &&
                          typeof primaryImagePreview === "object"
                            ? URL.createObjectURL(primaryImagePreview)
                            : typeof primaryImagePreview === "string"
                              ? primaryImagePreview
                              : galleryIcon
                        }
                        className={` rounded-lg  object-cover ${primaryImagePreview ? "w-full h-full" : "w-24 h-24"} `}
                      />
                      <span
                        className={`text-[#131B2E] ${primaryImagePreview ? "hidden" : "block"}`}
                      >
                        Primary Showcase Image
                      </span>
                      <label
                        htmlFor="SetImage"
                        className="text-[#464555] cursor-pointer"
                      >
                        {!primaryImagePreview && "Click to browse"}
                      </label>
                    </div>
                    {/* Image 2*/}
                    <div
                      className={`relative flex flex-col justify-center items-center border-[#C7C4D8] border-2 border-dashed rounded-lg w-48 md:w-full mx-auto h-48 ${secondaryImagePreview ? "" : "cursor-pointer"} `}
                      onClick={() => {
                        if (!secondaryImagePreview) {
                          secondaryImageRef.current!.click();
                        }
                      }}
                    >
                      {secondaryImagePreview && (
                        <img
                          src={removeImageicon}
                          className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                          onClick={() => {
                            setSecondaryImagePreview(null);
                            setConfirm(true);
                          }}
                        />
                      )}
                      <input
                        type="file"
                        ref={secondaryImageRef}
                        id="SetImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSecondaryImagePreview(file);
                            setConfirm(true);
                          }
                        }}
                      />

                      <img
                        src={
                          secondaryImagePreview &&
                          typeof secondaryImagePreview === "object"
                            ? URL.createObjectURL(secondaryImagePreview)
                            : typeof secondaryImagePreview === "string"
                              ? secondaryImagePreview
                              : galleryIcon
                        }
                        className={`rounded-lg  object-cover ${secondaryImagePreview ? "w-full h-full" : "w-24 h-24"} `}
                      />
                      <span
                        className={`text-[#131B2E] text-center ${secondaryImagePreview ? "hidden" : "block"}`}
                      >
                        Secondary Showcase Image
                      </span>
                      <label
                        htmlFor="SetImage"
                        className="text-[#464555] cursor-pointer"
                      >
                        {!secondaryImagePreview && "Click to browse"}
                      </label>
                    </div>
                    {/* Image 3*/}
                    <div
                      className={`relative flex flex-col justify-center items-center border-[#C7C4D8] border-2 border-dashed rounded-lg w-48 md:w-full h-48 ${ternaryImagePreview ? "" : "cursor-pointer"} `}
                      onClick={() => {
                        if (!ternaryImagePreview)
                          ternaryImageRef.current!.click();
                      }}
                    >
                      {ternaryImagePreview && (
                        <img
                          src={removeImageicon}
                          className="top-3 right-3 z-10 absolute bg-transparent shadow-md invert-50 ml-auto rounded-full w-5 h-5 cursor-pointer contrast-100"
                          onClick={() => {
                            setTernaryImagePreview(null);
                            setConfirm(true);
                          }}
                        />
                      )}
                      <input
                        type="file"
                        ref={ternaryImageRef}
                        id="SetImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setTernaryImagePreview(file);
                            setConfirm(true);
                          }
                        }}
                      />

                      <img
                        src={
                          ternaryImagePreview &&
                          typeof ternaryImagePreview === "object"
                            ? URL.createObjectURL(ternaryImagePreview)
                            : typeof ternaryImagePreview === "string"
                              ? ternaryImagePreview
                              : galleryIcon
                        }
                        className={`rounded-lg  object-cover ${ternaryImagePreview ? "w-full h-full" : "w-24 h-24"} `}
                      />
                      <span
                        className={`text-[#131B2E] ${ternaryImagePreview ? "hidden" : "block"}`}
                      >
                        Third Showcase Image
                      </span>
                      <label
                        htmlFor="SetImage"
                        className="text-[#464555] cursor-pointer"
                      >
                        {!ternaryImagePreview && "Click to browse"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full lg:w-1/3">
              <div className="flex flex-col gap-6 bg-white shadow-md p-6 border-[#ACA8D7]/15 border-2 rounded-2xl">
                <span className="text-[#131B2E] text-xl">Pricing Snapshot</span>
                <div className="flex flex-col gap-3">
                  {gig?.basic?.features && (
                    /* These serve no functional purpose just using them for looks :)*/
                    <PackageBar
                      setDelivery={() => {}}
                      setPrice={() => {}}
                      setFeatures={() => {}}
                      features={gig?.basic.features}
                      price={gig?.basic.price}
                      delivery={gig.basic.delivery}
                      name="Basic"
                      plan={gig?.basic}
                      editState={false}
                    />
                  )}
                  {gig?.standard?.features &&
                    gig.standard.features.length > 0 && (
                      <PackageBar
                        price={gig?.standard.price}
                        setDelivery={() => {}}
                        setFeatures={() => {}}
                        setPrice={() => {}}
                        features={gig?.standard?.features}
                        name="Standard"
                        delivery={gig.standard?.delivery}
                        plan={gig?.standard}
                        editState={false}
                      />
                    )}
                  {gig?.premium?.features &&
                    gig.premium.features.length > 0 && (
                      <PackageBar
                        setPrice={() => {}}
                        price={gig?.premium.price}
                        setDelivery={() => {}}
                        setFeatures={() => {}}
                        features={gig?.premium?.features}
                        delivery={gig?.premium?.delivery}
                        name="Premium"
                        plan={gig?.premium}
                        editState={false}
                      />
                    )}
                </div>
                <span className="font-medium text-[#464555]">
                  Prices are competetive for your category.
                </span>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-6 bg-white shadow-md p-6 border-[#ACA8D7]/15 border-2 rounded-2xl">
                  <span className="text-[#131B2E] text-xl">
                    Advanced Options
                  </span>
                  <div
                    className="flex gap-3 text-[#131B2E] cursor-pointer"
                    onClick={() => {
                      (setGig((prev) => {
                        if (!prev) return prev;
                        return gig?.paused
                          ? { ...prev, paused: false }
                          : { ...prev, paused: true };
                      }),
                        setConfirm(true));
                    }}
                  >
                    <img
                      src={gig?.paused ? unpauseIcon : pauseIcon}
                      className="w-8 h-8"
                    />
                    <span className="text-xl">
                      {gig?.paused ? "Unpause Gig" : "Pause Gig"}
                    </span>
                    <img src={nextIcon} className="ml-auto w-8 h-8" />
                  </div>
                  <div className="relative">
                    <div
                      className="flex gap-3 text-[#131B2E] cursor-pointer"
                      onClick={copyLink}
                    >
                      <img src={shareIcon} className="w-8 h-8" />
                      <span className="text-xl">Share Link</span>
                      <img src={nextIcon} className="ml-auto w-8 h-8" />
                    </div>
                    <span
                      className={`${showCopied ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"} font-semibold w-full absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-[#d1dff9] p-3 text-[#4458f1] transition-all duration-300`}
                    >
                      <img src={checkIcon} className="w-5 h-5" alt="Success" />
                      Link copied to clipboard
                    </span>
                  </div>
                  <div className="flex gap-3 border-t border-t-[#E2E7FF] text-[#131B2E]">
                    <div
                      onClick={() => setDeleteState(true)}
                      className="flex gap-3 mt-6 cursor-pointer"
                    >
                      <img src={deleteIcon} className="w-8 h-8" />
                      <span className="text-[#BA1A1A] text-xl">Delete Gig</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default EditGig;
