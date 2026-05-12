import React from "react";
import NavBar from "../../src/Frontend/NavBar";
import Footer from "../Footer";

function AboutPage() {
  return (
    <>
      <NavBar></NavBar>

      <main>
        {/*First seciton*/}
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

        {/*Second seciton*/}
        <section className="flex justify-center items-center bg-[#F3EEFF] h-140">
          <div className="flex w-100 h-50">
            <div className="w-1/2 h-full">
              <h2>Generic shit so that it works</h2>
            </div>
            <div className="w-1/2 h-full">
              <h2>Here will be a pictture</h2>
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
