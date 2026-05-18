import type { ChangeEvent, RefObject } from "react";
import type { PublicProfile } from "../types";
import { FALLBACK_BIO, formatMemberSince } from "../profileUtils";
import type { Gig } from "../../types/Gig";

type ProfileHeaderProps = {
  profile: PublicProfile | null;
  gigs: Gig[];
  profileImageUrl: string;
  isLoading: boolean;
  isOwnProfile: boolean;
  isEditing: boolean;
  isSaving: boolean;
  isUploadingImage: boolean;
  draftBio: string;
  draftLocation: string;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onBioChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onlineStatus: boolean;
};

function ProfileHeader({
  profile,
  gigs,
  profileImageUrl,
  isLoading,
  isOwnProfile,
  isEditing,
  isSaving,
  isUploadingImage,
  draftBio,
  draftLocation,
  imageInputRef,
  onEdit,
  onCancelEdit,
  onSave,
  onBioChange,
  onLocationChange,
  onImageChange,
  onlineStatus,
}: ProfileHeaderProps) {
  const hasCoverImage = Boolean(profile?.coverImageUrl);
  const primaryTextClass = hasCoverImage ? "text-white" : "text-[#2C2A51]";
  const secondaryTextClass = hasCoverImage ? "text-white/85" : "text-[#5A5781]";

  return (
    <section
      className="relative bg-[#F3EEFF] border-[#E7E2F5] border-b overflow-hidden"
      style={
        hasCoverImage
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(17,18,45,0.74) 0%, rgba(17,18,45,0.54) 38%, rgba(17,18,45,0.2) 100%), linear-gradient(0deg, rgba(17,18,45,0.34), rgba(17,18,45,0.08)), url(${profile?.coverImageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : undefined
      }
    >
      {isLoading && !profile ? (
        <div className="flex justify-center items-center min-h-[220px] text-[#5A5781] text-sm">
          Loading profile...
        </div>
      ) : !profile ? (
        <div className="flex justify-center items-center min-h-[220px] text-[#5A5781] text-sm">
          Profile could not be found.
        </div>
      ) : (
        <>
          {isOwnProfile && (
            <div className="top-5 right-5 md:right-[calc((100vw-1184px)/2+24px)] z-20 absolute flex flex-wrap justify-end gap-2">
              {/* Edit buttons are only shown when viewing your own profile. */}
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="bg-white/80 hover:bg-white px-4 py-2 border border-white/50 rounded-full font-bold text-[#0050D4] text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-[#0050D4] hover:bg-[#003EAA] disabled:opacity-60 shadow-[0_10px_18px_rgba(0,80,212,0.22)] px-4 py-2 rounded-full font-bold text-white text-xs transition cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onEdit}
                  className="bg-[#0050D4] hover:bg-[#003EAA] shadow-[0_10px_18px_rgba(0,80,212,0.22)] px-4 py-2 rounded-full font-bold text-white text-xs transition cursor-pointer"
                >
                  <i className="fa-pen-to-square mr-2 fa-regular"></i>
                  Edit Profile
                </button>
              )}
            </div>
          )}

          {/* Cover hero. Edit mode swaps the text into form fields below. */}
          <div className="flex md:flex-row flex-col justify-center md:justify-start md:items-center gap-7 mx-auto px-4 sm:px-6 py-20 md:pr-40 max-w-[1184px] min-h-[300px]">
            <div className="group relative bg-white shadow-[0_12px_30px_rgba(17,18,45,0.22)] rounded-full ring-4 ring-white w-[132px] md:w-[148px] h-[132px] md:h-[148px] overflow-hidden cursor-pointer shrink-0">
              <input
                type="file"
                ref={imageInputRef}
                id="SetImage"
                accept="image/*"
                className="hidden"
                disabled={!isOwnProfile || !isEditing || isUploadingImage}
                onChange={onImageChange}
              />

              <img
                src={profileImageUrl}
                alt={`${profile.username}'s profile`}
                className="w-full h-full object-cover"
              />

              {isOwnProfile && isEditing && (
                // Profile image upload is available only while editing your own profile.
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="z-10 absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 text-white transition-opacity cursor-pointer"
                  disabled={isUploadingImage}
                  aria-label="Upload profile picture"
                >
                  <i className="text-3xl fa-solid fa-upload"></i>
                </button>
              )}
            </div>

            <div className="flex-1 pt-0 md:pt-1 min-w-0">
              {/* Profile identity */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1
                    className={`max-w-[780px] text-[40px] font-bold leading-tight drop-shadow-sm md:text-[44px] ${primaryTextClass}`}
                  >
                    Hi, I'm {profile.fullname || profile.username}
                  </h1>
                </div>
                <p
                  className={`mt-1 text-sm font-bold drop-shadow-sm ${secondaryTextClass}`}
                >
                  <i className="mr-2 text-[11px] fa-solid fa-location-dot"></i>
                  {profile.location || "Location not added"}
                </p>
                <div className="flex items-center gap-x-2 mt-3">
                  <span
                    className={`w-3 h-3 rounded-full ${onlineStatus ? "bg-green-500" : "bg-red-500"} `}
                  ></span>

                  <span
                    className={`text-sm font-bold drop-shadow-sm  ${hasCoverImage ? "text-white/85" : "text-[#5A5781]"}`}
                  >
                    {onlineStatus ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              {/* Profile description and location edit fields */}
              <div className="mt-5 max-w-[690px]">
                {isEditing ? (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="block mb-2 font-bold text-white text-sm">
                        Location
                      </span>
                      <input
                        value={draftLocation}
                        maxLength={80}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="London, United Kingdom"
                        className="bg-white px-4 py-3 border border-[#DDD9FF] focus:border-[#0050D4] rounded-xl outline-none focus:ring-[#0050D4]/10 focus:ring-4 w-full text-[#2C2A51] text-sm transition"
                      />
                    </label>

                    <label className="block">
                      <span className="block mb-2 font-bold text-white text-sm">
                        Description
                      </span>
                      <textarea
                        value={draftBio}
                        maxLength={500}
                        rows={4}
                        onChange={(e) => onBioChange(e.target.value)}
                        placeholder="Tell clients who you are and what kind of work you do."
                        className="bg-white px-4 py-3 border border-[#DDD9FF] focus:border-[#0050D4] rounded-xl outline-none focus:ring-[#0050D4]/10 focus:ring-4 w-full text-[#2C2A51] text-sm leading-6 transition resize-none"
                      />
                    </label>
                  </div>
                ) : (
                  <p
                    className={`text-[17px] leading-7 drop-shadow-sm ${secondaryTextClass}`}
                  >
                    {profile.bio || FALLBACK_BIO}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`text-sm font-semibold ${
              hasCoverImage
                ? "bg-black/45 text-white"
                : "bg-white/55 text-[#2C2A51]"
            }`}
          >
            <div className="flex flex-wrap justify-between gap-2 mx-auto px-4 sm:px-6 py-4 max-w-[1184px]">
              <p>
                <i className="mr-2 fa-regular fa-calendar"></i>
                {formatMemberSince(profile.createdAt)}
              </p>
              <p>
                <i className="mr-2 fa-solid fa-language"></i>
                {profile.languages?.length ?? 0} languages
              </p>
              <p>
                <i className="mr-2 fa-solid fa-screwdriver-wrench"></i>
                {profile.skills?.length ?? 0} skills
              </p>
              <p>
                <i className="mr-2 text-yellow-400 text-xs fa-solid fa-star"></i>
                {gigs
                  ? (
                      gigs
                        ?.map((gig) => gig.rating || 0)
                        .reduce((a, b) => a + b, 0) / (gigs?.length || 1)
                    )
                      .toFixed(1)
                      .toString() || "0.0"
                  : "0.0"}{" "}
                Seller Rating
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfileHeader;
