import NavBar from "../NavBar/NavBar";
import Footer from "../Footer";
import Rate from "./Components/Rate";
import me from "../assets/me.jpeg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoBackIcon from "../assets/go-back-arrow.svg";

function CustomerReview() {
  const gigId = "dewidf3w90fi3f3w";
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) setSuccess(true);

  }

  (useEffect(() => {
    console.log({ gigId, rating });
  }),
    [rating]);

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
      <div className="bg-[#FAF8FF]">
             <div className="flex flex-col px-3 gap-3 py-12 text-center">
        <h2 className="text-4xl">Review Your Experience</h2>
        <p className="text-[#464555] text-xl">
          A quick review helps both buyers and sellers grow.
        </p>
        </div>
      <div className="h-screen  ld:w-1/3 md:w-1/2 mx-auto">
        <div className="w-full p-6 flex flex-col gap-6">
          <div className="flex flex-col border shadow-md/5 border-[#E2E8F0] bg-white rounded-2xl w-full px-12">
            <div className="py-6 items-center gap-6 flex flex-wrap w-full">
              <img
                src={me}
                className="w-18 h-18 border border-[#E2DFFF] md:mx-0 mx-auto flex rounded-full"
              />
              <div className="flex flex-col gap-1">
                <span className="font-semibold md:text-2xl text-xl">
                  Modern SaaS Dashboard Design
                </span>
                <span className="font-semibold text-[#464555]">
                  Service by <span className="text-[#3525CD]">Johan</span>
                </span>
              </div>
            </div>
          </div>
          <Rate setRating={setRating} rating={rating} />
          <span className="font-semibold text-xl text-[#131B2E]">
            Share you experience
          </span>
          <div className="flex p-6 flex-col border shadow-md/5 bg-white border-[#E2E8F0] rounded-2xl w-full">
            <textarea
              rows={5}
              className="focus:outline-none md:text-xl rounded-lg w-full text-[#6B7280] resize-none"
              placeholder="Describe the quality of the work, communication, 
and if the seller met your expectations..."
            />
          </div>

          <button
            className={`${rating < 1 ? "opacity-50" : ""} cursor-pointer bg-linear-to-r from-[#4F46E5] to-[#a081e8] py-3 text-white font-semibold rounded-lg`}
            disabled={rating < 1}
            onClick={() => handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}

export default CustomerReview;
