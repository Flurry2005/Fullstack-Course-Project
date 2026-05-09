import React, { useRef, useState } from "react";
import NavBar from "../NavBar";
import { useAuth } from "../Context/useAuth";
import me from "../assets/me.jpeg";
import type { User } from "../types/User";

function ProfilePage() {
  const { user, login } = useAuth();
  const formData = new FormData();

  const [primaryImagePreview, setPrimaryImagePreview] = useState("");
  const primaryImageRef = useRef<HTMLInputElement | null>(null);

  return (
    <section>
      <NavBar />

      <div className="flex justify-center gap-x-8 mx-auto mt-24 container">
        <div className="group relative rounded-2xl w-[224px] h-[224px] overflow-hidden">
          <input
            type="file"
            ref={primaryImageRef}
            id="SetImage"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("file", file);

              const response = await fetch(
                `${
                  import.meta.env.VITE_DEV === "true"
                    ? "http://localhost:3000"
                    : "https://fullstackapi.liamjorgensen.dev"
                }/api/upload/profilePicture`,
                {
                  method: "POST",
                  body: formData,
                  credentials: "include",
                },
              );

              const url = await response.text();

              if (!user) return;

              login({
                ...user,
                profilePictureUrl: url,
              });
            }}
          />

          <img
            src={
              user?.profilePictureUrl
                ? `${user.profilePictureUrl}${
                    user.profilePictureUrl.includes("?") ? "&" : "?"
                  }t=${Date.now()}`
                : "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/default-profilePicture?_a=BAMAPqUs0"
            }
            alt=""
            onClick={() => primaryImageRef.current?.click()}
            className="w-full h-full object-cover cursor-pointer"
          />

          <button
            type="button"
            onClick={() => primaryImageRef.current?.click()}
            className="z-10 absolute inset-0 flex justify-center items-center bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <i className="text-white text-4xl fa-solid fa-upload"></i>
          </button>
        </div>

        <div>
          <div>
            <h2 className="font-bold text-[#2C2A51] text-5xl">Elena Vance</h2>
            <span className="font-normal text-[#5A5781] text-sm">
              {" "}
              <i className="fa-solid fa-map-pin"></i> London, United Kingdom
            </span>
          </div>

          <p className="max-w-[672px] text-base">
            Founder of the Digital Atelier approach. I specialize in crafting
            boutique brand identities that resonate with precision and
            human-centric design. Every project is a curated journey of
            excellence.
          </p>
        </div>
      </div>

      <div></div>
    </section>
  );
}

export default ProfilePage;
