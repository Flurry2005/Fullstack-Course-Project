import locationIcon from "../assets/location-icon.svg";
import responseTimeIcon from "../assets/response-time-icon.svg";
import ContactMeButton from "./ContactMeButton";
import type { PublicProfile } from "../ProfilePage/types";

type AboutSellerProps = {
  profile: PublicProfile | null;
};

function AboutSeller({ profile }: AboutSellerProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[#2C2A51] text-2xl">Meet The Creator</h3>
      <div className="bg-white shadow-[0_0_12px_rgba(145,254,239,0.3)] p-6 border border-[#ACA8D7]/10 rounded-2xl">
        <div className="flex flex-wrap md:flex-nowrap gap-6 w-full">
          <img
            src={profile ? profile?.profilePictureUrl : ""}
            onError={(e) => {
              e.currentTarget.src =
                "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";
            }}
            className="md:place-self-start mx-auto md:mx-0 rounded-2xl w-30 h-30"
          />
          <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <h4 className="font-bold text-[#2C2A51] text-xl">
                  {profile?.username}
                </h4>
                <span className="text-[#5A5781] text-sm">
                  {profile
                    ? profile.skills
                      ? profile.skills[0]
                      : "No Skills"
                    : "No Skills"}
                </span>

                <div className="flex flex-wrap justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-[#5A5781] text-xs">
                      <img src={locationIcon} className="w-3 h-3" />
                      {profile ? profile?.location : ""}
                    </span>
                    <span className="flex items-center gap-1 text-[#5A5781] text-xs">
                      <img src={responseTimeIcon} className="w-3 h-3" />
                      Avg 4h Response
                    </span>
                  </div>

                  <ContactMeButton />
                </div>
              </div>
            </div>

            <p className="text-[#5A5781] text-sm">
              {profile ? profile?.bio : ""}
            </p>
            <hr className="text-[#E3DFFF]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSeller;
