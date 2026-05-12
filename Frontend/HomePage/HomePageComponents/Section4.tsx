import Section4Card from "./Section4Card";

function Section2() {
  return (
    <section className="z-0 flex flex-col items-center bg-[#f2ecfc] pt-10 w-full h-140 text-center">
      <h1 className="my-10 font-semibold text-[#23235b] text-[44px] leading-tight">
        A whole world of freelance talent
        <br /> at your fingertips
      </h1>

      <div className="flex justify-center gap-6 h-">
        <Section4Card
          title={"Over 700 Categories"}
          icon={<i className="fa-layer-group fa-solid"></i>}
          text="Get settle for less. Find Exactly the service you need for any project, big or small."
        />
        <Section4Card
          title={"Secure Payments"}
          icon={<i className="fa-solid fa-shield-halved"></i>}
          text="Know what you'll pay upfron. Your payment isn't released untill you approve the work."
        />
        <Section4Card
          title={"24/7 Support"}
          icon={<i className="fa-solid fa-headset"></i>}
          text="Our support team is available around the clock to help you with anything."
        />
      </div>
    </section>
  );
}

export default Section2;
