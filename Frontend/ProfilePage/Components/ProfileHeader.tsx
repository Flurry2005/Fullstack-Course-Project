import type { ChangeEvent, RefObject } from "react";
import type { PublicProfile } from "../types";
import { FALLBACK_BIO, formatMemberSince } from "../profileUtils";

type ProfileHeaderProps = {
  profile: PublicProfile | null;
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
      className="relative overflow-hidden border-b border-[#E7E2F5] bg-[#F3EEFF]"
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
        <div className="flex min-h-[220px] items-center justify-center text-sm text-[#5A5781]">
          Loading profile...
        </div>
      ) : !profile ? (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-[#5A5781]">
          Profile could not be found.
        </div>
      ) : (
        <>
          {isOwnProfile && (
            <div className="absolute right-5 top-5 z-20 flex flex-wrap justify-end gap-2 md:right-[calc((100vw-1184px)/2+24px)]">
              {/* Edit buttons are only shown when viewing your own profile. */}
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-bold text-[#0050D4] transition hover:bg-white  cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="rounded-full bg-[#0050D4] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_18px_rgba(0,80,212,0.22)] transition hover:bg-[#003EAA] disabled:cursor-not-allowed disabled:opacity-60  cursor-pointer"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onEdit}
                  className="cursor-pointer rounded-full bg-[#0050D4] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_18px_rgba(0,80,212,0.22)] transition hover:bg-[#003EAA]"
                >
                  <i className="fa-regular fa-pen-to-square mr-2"></i>
                  Edit Profile
                </button>
              )}
            </div>
          )}

          {/* Cover hero. Edit mode swaps the text into form fields below. */}
          <div className="mx-auto flex min-h-[300px] max-w-[1184px] flex-col justify-center gap-7 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-start md:pr-40">
            <div className="cursor-pointer group relative h-[132px] w-[132px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_12px_30px_rgba(17,18,45,0.22)] ring-4 ring-white md:h-[148px] md:w-[148px]">
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
                className="h-full w-full object-cover"
              />

              {isOwnProfile && isEditing && (
                // Profile image upload is available only while editing your own profile.
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 text-white opacity-0 transition-opacity group-hover:opacity-100  cursor-pointer"
                  disabled={isUploadingImage}
                  aria-label="Upload profile picture"
                >
                  <i className="fa-solid fa-upload text-3xl"></i>
                </button>
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0 md:pt-1">
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
                  <i className="fa-solid fa-location-dot mr-2 text-[11px]"></i>
                  {profile.location || "Location not added"}
                </p>
                <div className="flex gap-x-2 items-center mt-3">
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
                      <span className="mb-2 block text-sm font-bold text-white">
                        Location
                      </span>
                      <input
                        value={draftLocation}
                        maxLength={80}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="London, United Kingdom"
                        className="w-full rounded-xl border border-[#DDD9FF] bg-white px-4 py-3 text-sm text-[#2C2A51] outline-none transition focus:border-[#0050D4] focus:ring-4 focus:ring-[#0050D4]/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-white">
                        Description
                      </span>
                      <textarea
                        value={draftBio}
                        maxLength={500}
                        rows={4}
                        onChange={(e) => onBioChange(e.target.value)}
                        placeholder="Tell clients who you are and what kind of work you do."
                        className="w-full resize-none rounded-xl border border-[#DDD9FF] bg-white px-4 py-3 text-sm leading-6 text-[#2C2A51] outline-none transition focus:border-[#0050D4] focus:ring-4 focus:ring-[#0050D4]/10"
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
            <div className="mx-auto grid max-w-[1184px] gap-3 px-4 py-4 sm:px-6 md:grid-cols-3">
              <p>
                <i className="fa-regular fa-calendar mr-2"></i>
                {formatMemberSince(profile.createdAt)}
              </p>
              <p>
                <i className="fa-solid fa-language mr-2"></i>
                {profile.languages?.length ?? 0} languages
              </p>
              <p>
                <i className="fa-solid fa-screwdriver-wrench mr-2"></i>
                {profile.skills?.length ?? 0} skills
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProfileHeader;
