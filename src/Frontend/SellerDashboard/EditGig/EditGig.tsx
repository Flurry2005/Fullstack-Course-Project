import NavBar from "../../NavBar";
import Footer from "../../Footer";
import { useParams, Link } from "react-router-dom";
import GoBackIcon from "../../assets/go-back-arrow.svg";
import { useEffect, useState } from "react";
import type { Gig } from "../../types/Gig";
import overViewIcon from "../../assets/info-icon.svg";
import packageIcon from "../../assets/package-icon.svg";
import descIcon from "../../assets/description-icon.svg";
import EditButton from "./EditButton";
import PackageBar from "./PackageBar";
import pauseIcon from "../../assets/pause-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import shareIcon from "../../assets/share-icon.svg";
import nextIcon from "../../assets/next-icon.svg";
import galleryIcon from "../../assets/image-regular-icon.svg";
import Overview from "./Overview";
import Confirm from "./Confirm";
import Delete from "./Delete";
import Description from "./Description";
import { useNavigate } from "react-router-dom";

function EditGig() {
  const navigate = useNavigate();
  const { gigId } = useParams();
  const [gig, setGig] = useState<Gig>();
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [overView, setOverview] = useState(false);
  const [desc, setDesc] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmConfirm, setConfirmConfirm] = useState(false);

  const getGig = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/edit/"}${gigId}`,
      { credentials: "include" },
    );
    const data = await response.json();
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
    }
  }, [editState]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col bg-white border-b border-[#E2E8F0] p-6">
        <div className="flex items-center">
          {" "}
          <Link to="/dashboard">
            <img src={GoBackIcon} className="cursor-pointer w-10 h-14" />
          </Link>
          <h2 className="text-3xl font-semibold p-6">Gig Details</h2>
        </div>
      </div>
      <div className="relative">
        {confirmConfirm && gig && (
          <Confirm
            getGig={getGig}
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

        {desc && editState && gig && <Description gig={gig} />}
        {deleteState && gig && (
          <Delete getGig={getGig} gig={gig} setDeleteState={setDeleteState} />
        )}

        <main
          onClick={() => setEditState(false)}
          className={`flex ${editState || confirmConfirm || deleteState ? "opacity-10" : "opacity-100"} flex-col w-full bg-[#f9f5ff] p-6 gap-6`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <span
                className={`inline-flex items-center px-5 py-2 rounded-2xl {
                ${gig?.pending ? "bg-[#fffd7f]" : "bg-[#7fffd4]"} width: "fit-content" `}
              >
                <span className="inline-block bg-black w-2 h-2 rounded-full border mr-2" />
                <span
                  className=" text-black text-base"
                  style={{ lineHeight: "1" }}
                >
                  {gig?.pending ? "Pending" : "Live"}
                </span>
              </span>
              <span className="text-[#464555]">Last updated 2 days ago</span>
            </div>
            <h3 className="text-[#131B2E] font-semibold text-4xl">
              {gig?.title}
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
              <div className="flex flex-col  rounded-2xl  border-2 shadow-md border-[#ACA8D7]/15 bg-white">
                <div className="flex w-full items-center border-b-[#E2E7FF] border-b">
                  <div className="p-6 flex gap-6 items-center w-full">
                    <div className="flex rounded-2xl bg-[#E2E7FF] w-16  h-16 items-center justify-center">
                      <img src={overViewIcon} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#131B2E] text-xl">Overview</span>
                      <span className="text-[#464555]">
                        Title, Category, Search Tags
                      </span>
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

                <div className="flex w-full items-center border-b-[#E2E7FF] border-b">
                  <div className="p-6 flex gap-6 items-center w-full">
                    <div className="flex rounded-2xl bg-[#E2E7FF] w-16  h-16 items-center justify-center">
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
                    <span
                      className="ml-auto"
                      onClick={() => {
                      
                      }}
                    >
                      <EditButton />
                    </span>
                  </div>
                </div>

                <div className="flex w-full items-center">
                  <div className="p-6 flex gap-6 items-center w-full">
                    <div className="flex rounded-2xl bg-[#E2E7FF] w-16  h-16 items-center justify-center">
                      <img src={descIcon} className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#131B2E] text-xl">
                        Description
                      </span>
                      <span className="text-[#464555]">Detailed brief</span>
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
              <div className="flex flex-col  rounded-2xl  border-2 shadow-md border-[#ACA8D7]/15 bg-white">
                <div className="flex flex-col gap-6 p-6">
                  <span className="flex gap-3 items-center text-xl text-[#131B2E]">
                    <img src={galleryIcon} className="w-10 h-10" />
                    Media gallery
                  </span>
                  <div className="md:flex grid justify-center gap-6">
                    <div className="flex h-48 w-80 border-dashed border-2 justify-center items-center rounded-lg border-[#C7C4D8]">
                      <div className="flex flex-col items-center">
                        <img
                          src={galleryIcon}
                          className="w-24 h-24 grayscale-100 "
                        />
                        <span className="text-[#131B2E]">
                          Primary Showcase Image
                        </span>
                        <span className="text-sm">Click to browse</span>
                      </div>
                    </div>
                    <div className="flex h-48 w-80 border-dashed border-2 justify-center items-center rounded-lg border-[#C7C4D8]">
                      <div className="flex flex-col items-center">
                        <img
                          src={galleryIcon}
                          className="w-24 h-24 grayscale-100 "
                        />
                        <span className="text-sm text-[#464555] cursor-pointer">
                          Click to browse
                        </span>
                      </div>
                    </div>
                    <div className="flex h-48 w-80 border-dashed border-2 justify-center items-center rounded-lg border-[#C7C4D8]">
                      <div className="flex flex-col items-center">
                        <img
                          src={galleryIcon}
                          className="w-24 h-24 grayscale-100 "
                        />
                        <span className="text-sm text-[#464555] cursor-pointer">
                          Click to browse
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/3 gap-6">
              <div className="flex gap-6 flex-col bg-white p-6 border-2 shadow-md rounded-2xl border-[#ACA8D7]/15">
                <span className="text-[#131B2E] text-xl">Pricing Snapshot</span>
                <div className="flex flex-col gap-3">
                  {gig?.basic?.features && (
                    <PackageBar name="Basic" plan={gig?.basic} />
                  )}
                  {Array.isArray(gig?.standard?.features?.length) &&
                    gig?.standard?.features.length > 0 && (
                      <PackageBar name="Standard" plan={gig?.standard} />
                    )}
                  {Array.isArray(gig?.premium?.features?.length) &&
                    gig?.premium?.features.length > 0 && (
                      <PackageBar name="Premium" plan={gig?.premium} />
                    )}
                </div>
                <span className="text-[#464555] font-medium">
                  Prices are competetive for your category.
                </span>
              </div>

              <div className="flex flex-col w-full">
                <div className="flex gap-6 flex-col bg-white p-6 border-2 shadow-md rounded-2xl border-[#ACA8D7]/15">
                  <span className="text-[#131B2E] text-xl">
                    Advanced Options
                  </span>
                  <div className="flex gap-3 text-[#131B2E]">
                    <img src={pauseIcon} className="w-8 h-8" />
                    <span className="text-xl">Pause Gig</span>
                    <img src={nextIcon} className="ml-auto w-8 h-8" />
                  </div>
                  <div className="flex gap-3 text-[#131B2E]">
                    <img src={shareIcon} className="w-8 h-8" />
                    <span className="text-xl">Share Link</span>
                    <img src={nextIcon} className="ml-auto w-8 h-8" />
                  </div>
                  <div className="flex gap-3 border-t border-t-[#E2E7FF] text-[#131B2E]">
                    <div
                      onClick={() => setDeleteState(true)}
                      className="cursor-pointer flex gap-3 mt-6"
                    >
                      <img src={deleteIcon} className="w-8 h-8" />
                      <span className=" text-xl text-[#BA1A1A]">
                        Delete Gig
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`${confirm ? "opacity-100" : "opacity-25"} ml-auto cursor-pointer py-3 rounded-lg font-semibold text-white bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] px-6`}
            disabled={!confirm}
            onClick={() => setConfirmConfirm(true)}
          >
            Save changes
          </button>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default EditGig;
