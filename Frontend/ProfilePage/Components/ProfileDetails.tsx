import type { ChangeEvent, RefObject } from "react";
import type { PublicProfile } from "../types";

type ProfileDetailsProps = {
  profile: PublicProfile | null;
  isEditing: boolean;
  draftCoverImageUrl: string;
  draftLanguages: string;
  draftSkills: string;
  handleBannerImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  bannerImageRef: RefObject<HTMLInputElement | null>;
  onLanguagesChange: (value: string) => void;
  onSkillsChange: (value: string) => void;
};

function ProfileDetails({
  profile,
  isEditing,
  draftCoverImageUrl,
  draftLanguages,
  draftSkills,
  handleBannerImageChange,
  bannerImageRef,
  onLanguagesChange,
  onSkillsChange,
}: ProfileDetailsProps) {
  if (!profile) return null;

  return (
    <aside>
      <div className="flex items-end mb-6 pb-4 border-[#E5E0F2] border-b min-h-[62px]">
        <h2 className="font-bold text-[#2C2A51] text-[28px] leading-none">
          Profile Info
        </h2>
      </div>

      <div className="space-y-0 bg-white shadow-[0_10px_26px_rgba(90,87,129,0.06)] border border-[#E5E0F2] rounded-sm">
        {/* Cover image is stored as a URL until we add a dedicated upload flow. */}
        {isEditing && (
          <section className="p-5 border-[#E5E0F2] border-b h-full cursor-pointer">
            <h2 className="font-bold text-[#2C2A51] text-base cursor-pointer">
              Cover
            </h2>
            <label className="block mt-4 cursor-pointer">
              <span className="font-bold text-[#6F6F9A] text-xs uppercase cursor-pointer">
                Cover Image URL
              </span>
              <input
                type="file"
                ref={bannerImageRef}
                id="SetImage"
                accept="image/*"
                className="hidden"
                onChange={handleBannerImageChange}
              />
            </label>
          </section>
        )}

        {/* Languages are edited as one "Language - Level" item per line. */}
        <section className="p-5 border-[#E5E0F2] border-b">
          <h2 className="font-bold text-[#2C2A51] text-base">Languages</h2>

          {isEditing ? (
            <textarea
              value={draftLanguages}
              rows={5}
              onChange={(e) => onLanguagesChange(e.target.value)}
              placeholder={
                "English - Fluent\nSwedish - Conversational\nChinese - Native\n Danish - Basic"
              }
              className="bg-white mt-4 px-4 py-3 border border-[#DDD9FF] focus:border-[#0050D4] rounded-xl outline-none focus:ring-[#0050D4]/10 focus:ring-4 w-full text-[#2C2A51] text-sm leading-6 transition resize-none"
            />
          ) : profile.languages && profile.languages.length > 0 ? (
            <div className="space-y-3 mt-4">
              {profile.languages.map((language) => (
                <p
                  key={`${language.name}-${language.level}`}
                  className="flex justify-between gap-4 text-[#2C2A51] text-sm"
                >
                  <span>{language.name}</span>
                  <span className="font-semibold text-[#5A5781]">
                    {language.level}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[#5A5781] text-sm">
              No languages added yet.
            </p>
          )}
        </section>

        {/* Skills are edited as one item per line or comma-separated. */}
        <section className="p-5">
          <h2 className="font-bold text-[#2C2A51] text-base">Skills</h2>

          {isEditing ? (
            <textarea
              value={draftSkills}
              rows={5}
              onChange={(e) => onSkillsChange(e.target.value)}
              placeholder={"Branding\nLogo Design\nUI Design"}
              className="bg-white mt-4 px-4 py-3 border border-[#DDD9FF] focus:border-[#0050D4] rounded-xl outline-none focus:ring-[#0050D4]/10 focus:ring-4 w-full text-[#2C2A51] text-sm leading-6 transition resize-none"
            />
          ) : profile.skills && profile.skills.length > 0 ? (
            <div className="space-y-2 mt-4">
              {profile.skills.map((skill) => (
                <p
                  key={skill}
                  className="bg-[#F8F5FF] px-3 py-1.5 border border-[#D8D0F5] rounded-full w-fit font-medium text-[#2C2A51] text-sm text-left"
                >
                  {skill}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[#5A5781] text-sm">No skills added yet.</p>
          )}
        </section>
      </div>
    </aside>
  );
}

export default ProfileDetails;
