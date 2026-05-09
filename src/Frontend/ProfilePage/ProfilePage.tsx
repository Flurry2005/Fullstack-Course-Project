import React, { useRef, useState } from 'react'
import NavBar from '../NavBar'
import { useAuth } from "../Context/useAuth";
import me from "../assets/me.jpeg";
import type { User } from '../types/User';


function ProfilePage() {
  const { user, login } = useAuth();
  const formData = new FormData();


  const [primaryImagePreview, setPrimaryImagePreview] = useState("")
  const primaryImageRef = useRef<HTMLInputElement | null>(null);




  return (
    <section>
        <NavBar />


        <div className='flex gap-x-8 mt-24 container mx-auto justify-center'>
            
            <div className="group relative w-[224px] h-[224px] rounded-2xl overflow-hidden">
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
                    }/api/upload`,
                    {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                    }
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
            className="h-full w-full object-cover cursor-pointer"
            />

            <button
                type="button"
                onClick={() => primaryImageRef.current?.click()}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 opacity-0 transition-opacity group-hover:opacity-100"
            >
                <i className="fa-solid fa-upload text-4xl text-white"></i>
            </button>
            </div>
            

            <div>
                <div>
                    <h2 className='text-5xl text-[#2C2A51] font-bold'>Elena Vance</h2>
                    <span className='text-sm text-[#5A5781] font-normal'> <i className="fa-solid fa-map-pin"></i> London, United Kingdom</span>
                </div>

                <p className='text-base max-w-[672px]'>
                    Founder of the Digital Atelier approach. I specialize in crafting boutique
                    brand identities that resonate with precision and human-centric design.
                    Every project is a curated journey of excellence.
                </p>

            </div>



        </div>



        <div>
        </div>
        

    </section>
  )
}

export default ProfilePage