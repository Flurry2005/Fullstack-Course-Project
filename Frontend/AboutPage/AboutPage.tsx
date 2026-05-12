import React from "react";

import Footer from "../Footer";
import NavBar from "../NavBar/NavBar";

function AboutPage() {
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
            <div className="w-1/2 h-full text-center">
              <img
                src="/HomePage/goon.jpg"
                alt="goonråtta"
                className="w-full h-full object-contain aspect-square"
              />
            </div>
          </div>
        </section>

        {/*Second seciton*/}
        <section className="flex justify-center items-center bg-[#F3EEFF] h-140">
          <div className="flex w-250 h-115">
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
        <section className="flex justify-center items-center bg-[#FFFFFF] h-140">
          <div className="flex w-100 h-50">
            <div className="w-1/2 h-full">
              <h2>Generic shit so that it works</h2>
            </div>
            <div className="w-1/2 h-full">
              <h2>Here will be a pictture</h2>
            </div>
          </div>
        </section>

        {/*Forth seciton*/}
        <section className="flex justify-center items-center bg-[#E9E5FF] h-140">
          <div className="flex w-100 h-50">
            <div className="w-1/2 h-full">
              <h2>Generic shit so that it works</h2>
            </div>
            <div className="w-1/2 h-full">
              <h2>Here will be a pictture</h2>
            </div>
          </div>
        </section>

        {/*Last section*/}
        <section className="flex justify-center items-center bg-[#FFFFFF] h-140">
          <div className="flex w-100 h-50">
            <div className="w-1/2 h-full">
              <h2>This will be the end of the shit</h2>
            </div>
            <div className="w-1/2 h-full">
              <h2>And i will goon to the moon</h2>
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </>
  );
}

export default AboutPage;
