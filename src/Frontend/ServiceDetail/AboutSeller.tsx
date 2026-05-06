import me from "../assets/me.jpeg";
import locationIcon from "../assets/location-icon.svg";
import responseTimeIcon from "../assets/response-time-icon.svg";
import ContactMeButton from "./ContactMeButton";
import { useEffect, useState } from "react";
import type { User } from "../types/User";

type AboutSellerProps = {
  id: string | any;
};

function AboutSeller({ id }: AboutSellerProps) {
  const [seller, setSeller] = useState<User>();

  const getSeller = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/?id="}${id}`,
    );
    const data = await response.json();
    console.log(data);
    response.ok && setSeller(data);
  };

  useEffect(() => {
    getSeller();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl text-[#2C2A51]">Meet The Creator</h3>
      <div className="bg-white rounded-2xl p-6 border-[#ACA8D7]/10 border shadow-[0_0_12px_rgba(145,254,239,0.3)]">
        <div className="flex gap-6 w-full md:flex-nowrap flex-wrap">
          <img
            src={me}
            className="md:mx-0 md:place-self-start mx-auto w-30 h-30 rounded-2xl"
          />
          <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <h4 className="font-bold text-[#2C2A51] text-xl">
                  {seller?.username}
                </h4>
                <span className="text-sm text-[#5A5781]">Fisherman</span>

                <div className="flex gap-3 justify-between flex-wrap">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-xs text-[#5A5781]">
                      <img src={locationIcon} className="w-3 h-3" />
                      Malmö. Sweden
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#5A5781]">
                      <img src={responseTimeIcon} className="w-3 h-3" />
                      Avg 4h Response
                    </span>
                  </div>

                  <ContactMeButton />
                </div>
              </div>
            </div>

            <p className="text-[#5A5781] text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              quia aliquam voluptatibus officiis sunt, quod at dolorem enim sed
              error impedit nostrum ipsa consequuntur molestias natus eos
              praesentium dolore minus?
            </p>
            <hr className="text-[#E3DFFF]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSeller;
