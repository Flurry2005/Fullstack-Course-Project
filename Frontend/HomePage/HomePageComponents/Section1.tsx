import InputField from "../../Components/General/InputField";
import MiniButton from "./MiniButtonLink";

function Section1() {
  return (
    <section className="z-0 flex bg-[#f9f5ff]  pt-20 w-full min-h-140 container mx-auto">
      <div className="flex flex-col justify-center w-[50%] h-full">
        <h1 className="font-semibold text-6xl leading-18">
          GET HIGH-QUALITY
          <br />
          <span className="text-indigo-800">DIGITAL SERVICES</span>
          <br />
          AT YOUR FINGERTIPS
        </h1>
        <p className="pt-10 pb-5">
          The Digital Atelier connects you with the world's most talented
          creators to bring your vision to life through artisanal digital craft.
        </p>
        <div className="flex mb-5 pb-5 h-18">
          <InputField
            placeholder="What are you looking for today?"
            additionalClasses=" bg-[#e3dfff] px-4 w-[50%] h-full !rounded-r-none !rounded-md outline-none border-none focus:border-indigo-500 text-sm"
          />
          <span className="flex justify-center items-center bg-[#e3dfff] px-3 rounded-md rounded-l-none h-full text-gray-600">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        <div className="mb-10">
          <h2 className="pb-5 text-2xl">POPULAR:</h2>
          <div className="flex gap-5">
            <MiniButton to={"/services"} text={"Graphic Design"} />
            <MiniButton to={"/services"} text={"Writing"} />
            <MiniButton to={"/services"} text={"Video Editing"} />
            <MiniButton to={"/services"} text={"SEO"} />
          </div>
        </div>
      </div>
      <div className="gap-4 grid grid-cols-[1fr_0.95fr] w-1/2">
        <div className="pt-8">
          <img
            src="/HomePage/hero_place_holder_1.png"
            alt="Designer working"
            className="shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-3xl w-full h-97.5 object-cover hover:scale-[1.03] transition-all hover:-translate-y-3 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </div>

        <div className="flex flex-col gap-4">
          <img
            src="HomePage/hero_place_holder_2.png"
            alt="Desk workspace"
            className="shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-3xl w-full h-97.5 object-cover hover:scale-[1.03] transition-all hover:-translate-y-3 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />

          <div className="flex flex-col justify-end bg-[#82e3d7] p-8 rounded-3xl w-full h-55 mb-8">
            <div className="flex justify-center items-center mb-4 rounded-full w-12 h-12 text-[#145b56]">
              <i className="absolute text-5xl fa-solid fa-shield"></i>
              <i className="absolute text-[#82e3d7] text-[2.5rem] fa-solid fa-shield"></i>
              <i className="absolute fa-solid fa-check"></i>
            </div>

            <p className="font-medium text-[#145b56] text-[17px]">
              Curated Talent Only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
