import React from "react";

import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar></NavBar>
      <main>
        {/*First seciton*/}
        <section className="flex justify-center items-center bg-[#FFFFFF] h-140">
          <div className="flex w-250 h-100">
            <div className="w-1/2 h-full text-left">
              <h2 className="font-bold text-6xl">
                Connecting Visionary{" "}
                <span className="text-blue-500">Creators</span>
              </h2>
              <p className="mt-10 w-90 text-color[#5A5781]">
                Bringing clients and talented professionals together through a
                seamless digital marketplace designed for collaboration,
                creativity, and growth.
              </p>
            </div>
            <div className="w-auto h-full text-center">
              <img
                src="/HomePage/goon.jpg"
                alt="goonråtta"
                className="rounded-2xl w-full h-full object-contain aspect-square"
              />
            </div>
          </div>
        </section>

        {/*Second seciton*/}
        <section className="flex justify-center items-center bg-[#F3EEFF] h-110">
          <div className="flex w-250 h-90">
            <div className="w-1/3 h-full text-left">
              <p className="font-semibold text-blue-500 text-xs tracking-widest">
                OUR PHILOSOPHY
              </p>
              <h2 className="mt-5 w-70 font-bold text-3xl">
                Connecting Visionary Creators
              </h2>
            </div>
            <div className="flex flex-col justify-between ml-25 w-2/3 h-full">
              <h2 className="font-light text-xl text-left leading-10">
                We believe great digital work starts with meaningful
                connections. Our platform brings together talented creators and
                ambitious clients through a seamless marketplace built for
                collaboration, trust, and quality.
              </h2>
              <div className="flex justify-between gap-5">
                <div className="flex items-center bg-white rounded-2xl w-7/15 h-40 text-left">
                  <div className="flex flex-col items-start gap-2 px-6 w-full h-fit">
                    <img
                      src="/about1.png"
                      alt="ICON"
                      className="w-auto h-6 object-contain aspect-square"
                    />
                    <p className="font-semibold">Intentional Selection</p>

                    <p className="text-xs">
                      Only dedicated and skilled professionals become part of
                      our marketplace. We focus on quality, creativity, and
                      meaningful collaboration.
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-white rounded-2xl w-7/15 h-40 text-left">
                  <div className="flex flex-col items-start gap-2 px-6 w-full h-fit">
                    <img
                      src="/about2.png"
                      alt="ICON"
                      className="w-auto h-6 object-contain aspect-square"
                    />
                    <p className="font-semibold">Trusted Partnerships</p>

                    <p className="text-xs">
                      We do not simply connect services with clients - we create
                      opportunities for long-term collaboration, communication,
                      and growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Third seciton*/}
        <section className="flex justify-center items-center bg-[#FFFFFF] h-170">
          <div className="flex w-250 h-150">
            <div className="flex flex-col justify-center w-1/2 h-full text-center">
              <img
                src="/HomePage/goon.jpg"
                alt="goonråtta"
                className="rounded-2xl w-fit h-100 object-contain aspect-square"
              />
            </div>
            <div className="flex flex-col justify-center w-1/2 h-full text-left">
              <h2 className="font-bold text-3xl">
                OUR MISSION:{" "}
                <span className="text-blue-500">Human-Scale Innovation</span>
              </h2>
              <p className="mt-5 w-full text-color[#5A5781] text-sm tracking-widest">
                In a digital world filled with automation and endless noise, we
                believe meaningful creativity still comes from people. Our
                platform is built to empower independent creators, skilled
                professionals, and forward-thinking clients through genuine
                collaboration and modern digital experiences.
              </p>

              <div className="flex mt-5 w-full h-20">
                <div className="bg-[#0050D4]/10 p-3 rounded-full h-fit">
                  <img
                    src="/about3.png"
                    alt="icon"
                    className="w-auto h-4 object-contain"
                  />
                </div>
                <div className="flex flex-col ml-5 w-full">
                  <h3 className="font-semibold">Curated Quality</h3>
                  <p className="mt-3 text-sm">
                    We prioritize quality over quantity by creating a trusted
                    marketplace focused on professionalism, creativity, and high
                    standards.
                  </p>
                </div>
              </div>
              <div className="flex mt-5 w-full h-20">
                <div className="bg-[#702AE1]/10 p-3 rounded-full h-fit">
                  <img
                    src="/about4.png"
                    alt="icon"
                    className="w-auto h-4 object-contain"
                  />
                </div>
                <div className="flex flex-col ml-5 w-full">
                  <h3 className="font-semibold">Creator-First Approach</h3>
                  <p className="mt-3 text-sm">
                    We empower creators with the visibility, tools, and
                    opportunities they need to grow, collaborate, and succeed
                    independently.
                  </p>
                </div>
              </div>
              <div className="flex mt-5 w-full h-20">
                <div className="bg-[#00675E]/10 p-3 rounded-full h-fit">
                  <img
                    src="/about5.png"
                    alt="icon"
                    className="w-auto h-4 object-contain"
                  />
                </div>
                <div className="flex flex-col ml-5 w-full">
                  <h3 className="font-semibold">Future-Driven Vision</h3>
                  <p className="mt-3 text-sm">
                    Our mission is to connect ambitious ideas with talented
                    professionals to help shape the future of digital
                    innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Last seciton*/}
        <section className="flex justify-center items-center bg-[#E9E5FF] h-140">
          <div className="flex flex-col items-center bg-linear-to-r from-purple-700 to-blue-400 shadow-2xl rounded-2xl w-170 h-70">
            <div className="flex flex-col items-center p-10 w-full h-fit">
              <h2 className="font-bold text-white text-3xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mt-5 text-[#F1F2FF] text-sm text-center">
                Whether you are a talented creator or a client searching for the
                right partner, our platform is built to connect ambitious people
                through creativity and collaboration.
              </p>
            </div>
            <div className="flex justify-between items-center gap-20">
              <Link
                to="/register"
                className="flex justify-center justify-items-center items-center hover:bg-white shadow-2xl border border-white/30 rounded-2xl w-40 h-10 text-[#F1F2FF] hover:text-[#0050D4] text-center hover:transition-colors cursor-pointer"
              >
                Apply as Creator
              </Link>
              <Link
                to="/services"
                className="flex justify-center justify-items-center items-center hover:bg-white shadow-2xl border border-white/30 rounded-2xl w-40 h-10 text-[#F1F2FF] hover:text-[#0050D4] text-center hover:transition-colors cursor-pointer"
              >
                Browse listnings
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}

export default AboutPage;
