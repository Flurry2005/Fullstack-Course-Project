import FlexCard from "./FlexCard";

function Section2() {
  return (
    <section className="z-0 flex flex-col items-center bg-[#f2ecfc] px-5 sm:px-8 md:px-10 lg:px-16 py-12 sm:py-16 w-full text-center">
      <div className="mx-auto container">
        <h1 className="my-6 sm:my-10 font-semibold text-[#23235b] lg:text-[44px] text-2xl sm:text-3xl md:text-4xl leading-tight">
          A whole world of freelance talent
          <br /> at your fingertips
        </h1>

        <div className="flex md:flex-row flex-col justify-center gap-6 w-full">
          <FlexCard
            title={"Over 700 Categories"}
            icon={<i className="fa-layer-group fa-solid"></i>}
            text="Get settle for less. Find Exactly the service you need for any project, big or small."
          />

          <FlexCard
            title={"Secure Payments"}
            icon={<i className="fa-solid fa-shield-halved"></i>}
            text="Know what you'll pay upfront. Your payment isn't released until you approve the work."
          />

          <FlexCard
            title={"24/7 Support"}
            icon={<i className="fa-solid fa-headset"></i>}
            text="Our support team is available around the clock to help you with anything."
          />
        </div>
      </div>
    </section>
  );
}

export default Section2;
