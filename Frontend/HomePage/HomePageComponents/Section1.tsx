import InputField from "../../Components/General/InputField";
import MiniButton from "./MiniButtonLink";

function Section1() {
  return (
    <section className="z-0 flex lg:flex-row flex-col bg-[#f9f5ff] px-5 sm:px-10 pt-10 sm:pt-20 pb-6 sm:pb-8 w-full min-h-[90vh] lg:min-h-[70vh]">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 h-full">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight lg:leading-18">
          GET HIGH-QUALITY
          <br />
          <span className="text-indigo-800">DIGITAL SERVICES</span>
          <br />
          AT YOUR FINGERTIPS
        </h1>

        <p className="pt-6 sm:pt-10 pb-4 sm:pb-5 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga neque
          optio totam dolorum architecto tenetur cum nemo voluptates iure
          minima! Placeat distinctio obcaecati maiores, qui magnam illum hic
          possimus eveniet?
        </p>

        <div className="flex mb-5 pb-5 w-full h-14 sm:h-16 md:h-18">
          <InputField
            placeholder="What are you looking for today?"
            additionalClasses="bg-[#e3dfff] px-4 w-full sm:w-[70%] md:w-[50%] h-full !rounded-r-none !rounded-md outline-none border-none focus:border-indigo-500 text-sm"
          />
          <span className="flex justify-center items-center bg-[#e3dfff] px-3 rounded-md rounded-l-none h-full text-gray-600">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>

        <div className="mb-10">
          <h2 className="pb-5 text-lg sm:text-xl md:text-2xl">POPULAR:</h2>

          <div className="flex flex-wrap gap-3 sm:gap-5">
            <MiniButton to={"/"} text={"Graphic Design"} />
            <MiniButton to={"/"} text={"Writing"} />
            <MiniButton to={"/"} text={"Video Editing"} />
            <MiniButton to={"/"} text={"SEO"} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_0.95fr] mt-10 lg:mt-0 w-full lg:w-1/2">
        <div className="pt-0 sm:pt-8">
          <img
            src="/HomePage/goon.jpg"
            alt="Designer working"
            className="shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-3xl w-full h-60 sm:h-80 lg:h-97 object-cover hover:scale-[1.03] transition-all hover:-translate-y-3 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <img
            src="HomePage/goon.jpg"
            alt="Desk workspace"
            className="shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-3xl w-full h-60 sm:h-80 lg:h-97 object-cover hover:scale-[1.03] transition-all hover:-translate-y-3 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />

          <div className="flex flex-col justify-end bg-[#82e3d7] p-6 sm:p-8 rounded-3xl w-full h-auto sm:h-55">
            <div className="flex justify-center items-center mb-4 rounded-full w-12 h-12 text-[#145b56]">
              <i className="absolute text-5xl fa-solid fa-shield"></i>
              <i className="absolute text-[#82e3d7] text-[2.5rem] fa-solid fa-shield"></i>
              <i className="absolute fa-solid fa-check"></i>
            </div>

            <p className="font-medium text-[#145b56] sm:text-[17px] text-sm">
              Curated Talent Only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
