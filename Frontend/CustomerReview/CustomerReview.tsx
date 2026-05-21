import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import Rate from "./Components/Rate";
import me from "../assets/me.jpeg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoBackIcon from "../assets/go-back-arrow.svg";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { useRef } from "react";
import type { Gig } from "../types/Gig";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../utils/GetProfile";
import type { PublicProfile } from "../ProfilePage/types";

function CustomerReview() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);
  const { gigId } = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [gig, setGig] = useState<Gig>();
  const [canSendReview, setCanSendReview] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (rating > 0) {
      const response = await fetch(
        `${
          import.meta.env.VITE_DEV === "true"
            ? "http://localhost:3000"
            : "https://fullstackapi.liamjorgensen.dev"
        }/api/gig/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: gigId,
            rating: rating,
            comment: commentRef.current?.value,
          }),
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setCanSendReview(true);
      }
      setSuccess(response.ok);
      setTimeout(() => {
        navigate("/services");
      }, 2000);
    }
  };

  const getGig = async () => {
    if (!user?.username || !gigId) return;

    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api/gig/review/${gigId}`,
      { credentials: "include" },
    );
    const data = await response.json();
    console.log(data);
    response.ok ? setGig(data) : navigate("/");
  };

  useEffect(() => {
    getGig();
  }, []);

  const [profile, setProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    (async () => {
      const userProfile = await fetchProfile(gig!.sellerUsername!);
      setProfile(userProfile!);
    })();
  }, [gig]);

  return (
    <>
      <NavBar />

      <div className="flex items-center bg-white p-6 border-[#E2E8F0] border-b">
        {" "}
        <Link to="/dashboard">
          <img src={GoBackIcon} className="w-10 h-14 cursor-pointer" />
        </Link>
        <h2 className="p-6 font-semibold text-3xl">Review </h2>
      </div>

      
      <div className="bg-[#FAF8FF] flex flex-col gap-3 py-6">
       
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-4xl">
            {success ? "Thank You" : "Review Your Experience"}
          </h2>
          <p className="text-[#464555] text-xl">
            {success
              ? "We deeply appreciate your feedback!"
              : "A quick review helps both buyers and sellers grow."}
          </p>
        </div>

        <div className="mx-auto md:w-1/2">
          <div className="flex flex-col gap-6 p-6 w-full">
            <div className="flex flex-col bg-white shadow-md/5 px-12 border border-[#E2E8F0] rounded-2xl w-full">
              <div className="flex flex-wrap items-center gap-6 py-6 w-full">
                <img
                  src={profile?.profilePictureUrl || me}
                  className="flex mx-auto md:mx-0 border border-[#E2DFFF] rounded-full w-18 h-18"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl md:text-2xl">
                    {gig?.title}
                  </span>
                  <span className="font-semibold text-[#464555]">
                    Service by{" "}
                    <span className="text-[#3525CD]">
                      {gig?.sellerUsername}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <Rate setRating={setRating} rating={rating} />
            <span className="font-semibold text-[#131B2E] text-xl">
              Share you experience
            </span>
            <div className="flex flex-col bg-white shadow-md/5 p-6 border border-[#E2E8F0] rounded-2xl w-full">
              <textarea
                ref={commentRef}
                rows={5}
                className="rounded-lg focus:outline-none w-full text-[#6B7280] md:text-xl resize-none"
                placeholder="Describe the quality of the work, communication, 
and if the seller met your expectations..."
              />
            </div>

            <button
              className={`${rating < 1 || !canSendReview ? "opacity-50" : ""} cursor-pointer bg-linear-to-r from-[#4F46E5] to-[#a081e8] py-3 text-white font-semibold rounded-lg`}
              disabled={rating < 1 || !canSendReview}
              onClick={() => {
                if (!canSendReview) return;
                setCanSendReview(false);
                handleSubmit();
              }}
            >
              Submit Review
            </button>
          </div>
        </div>
        </div>
      
        <Footer />
      
    </>
  );
}

export default CustomerReview;
