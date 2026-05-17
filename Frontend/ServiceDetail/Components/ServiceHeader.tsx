import profileRatingsIcon from "../../assets/profile-ratings-icon.svg";
import type { Gig } from "../../types/Gig";
import { useNavigate } from "react-router-dom";
import type { PublicProfile } from "../../ProfilePage/types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ServiceProps = {
  title: string | any;
  seller: string | any;
  rating: number;
  reviewsAmount: number;
  gig: Gig;
  profile: PublicProfile | null;
};

function ServiceHeader({
  title,
  seller,
  rating,
  reviewsAmount,
  gig,
  profile,
}: ServiceProps) {
  const fallbackImage =
    "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/v1778358513/default-profilePicture?_a=BAMAPqUs0&t=1778358700344";

  const images = [
    gig.primaryImagePreview,
    gig.secondaryImagePreview,
    gig.ternaryImagePreview,
  ].filter(Boolean);

  const finalImages = images.length ? images : [fallbackImage];

  const [[selectedImage, direction], setSelectedImage] = useState<
    [number, number]
  >([0, 0]);

  const changeSlide = (newDirection: number) => {
    setSelectedImage(([prev]) => {
      let nextIndex = prev + newDirection;

      if (nextIndex < 0) nextIndex = finalImages.length - 1;
      if (nextIndex >= finalImages.length) nextIndex = 0;

      return [nextIndex, newDirection];
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#2C2A51] text-4xl">{title}</h2>

      {/* Seller Info */}
      <div
        className="flex items-center gap-3 w-fit cursor-pointer"
        onClick={() => navigate(`/profile/${gig.sellerUsername}`)}
      >
        <img
          src={profile?.profilePictureUrl || fallbackImage}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="border border-[#91FEEF] rounded-full w-12 h-12 object-cover"
          alt={seller}
        />

        <div className="flex flex-col">
          <span className="font-bold text-[#2C2A51]">{seller}</span>

          <div className="flex items-center gap-1 text-sm">
            <img src={profileRatingsIcon} className="w-3 h-3" />

            <span className="font-bold text-[#2C2A51]">
              {rating ? rating.toFixed(1) : "0.0"}
            </span>

            <span className="text-[#5A5781]">({reviewsAmount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Slideshow */}
      <div className="w-full">
        {/* Main Image */}
        <div className="relative bg-[#F4F4F8] rounded-2xl w-full aspect-video overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={selectedImage}
              src={finalImages[selectedImage]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              onError={(e: any) => {
                e.currentTarget.src = fallbackImage;
              }}
              className="absolute inset-0 w-full h-full object-contain"
              alt={`Gig Image ${selectedImage + 1}`}
            />
          </AnimatePresence>

          {/* Left Arrow */}
          {finalImages.length > 1 && (
            <button
              onClick={() => changeSlide(-1)}
              className="top-1/2 left-3 z-10 absolute bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition -translate-y-1/2 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Right Arrow */}
          {finalImages.length > 1 && (
            <button
              onClick={() => changeSlide(1)}
              className="top-1/2 right-3 z-10 absolute bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition -translate-y-1/2 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {finalImages.length > 1 && (
          <div className="flex justify-center mx-auto mt-4">
            {finalImages.map((img, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedImage([index, index > selectedImage ? 1 : -1])
                }
                className={`overflow-hidden rounded-xl border-2 max-w-30 transition-all cursor-pointer ${
                  selectedImage === index
                    ? "border-black/20 scale-[1.02]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <div className="bg-[#F4F4F8] aspect-16/10 overflow-hidden">
                  <img
                    src={img}
                    onError={(e: any) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceHeader;
