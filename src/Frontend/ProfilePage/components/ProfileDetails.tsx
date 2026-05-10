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
      <div className="mb-6 flex min-h-[62px] items-end border-b border-[#E5E0F2] pb-4">
        <h2 className="text-[28px] font-bold leading-none text-[#2C2A51]">
          Profile Info
        </h2>
      </div>

      <div className="space-y-0 rounded-sm border border-[#E5E0F2] bg-white shadow-[0_10px_26px_rgba(90,87,129,0.06)]">
        {/* Cover image is stored as a URL until we add a dedicated upload flow. */}
        {isEditing && (
          <section className="border-b border-[#E5E0F2] p-5">
            <h2 className="text-base font-bold text-[#2C2A51]">Cover</h2>
            <label className="mt-4 block">
              <span className="text-xs font-bold uppercase text-[#6F6F9A]">
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
        <section className="border-b border-[#E5E0F2] p-5">
          <h2 className="text-base font-bold text-[#2C2A51]">Languages</h2>

          {isEditing ? (
            <textarea
              value={draftLanguages}
              rows={5}
              onChange={(e) => onLanguagesChange(e.target.value)}
              placeholder={"English - Fluent\nSwedish - Conversational"}
              className="mt-4 w-full resize-none rounded-xl border border-[#DDD9FF] bg-white px-4 py-3 text-sm leading-6 text-[#2C2A51] outline-none transition focus:border-[#0050D4] focus:ring-4 focus:ring-[#0050D4]/10"
            />
          ) : profile.languages && profile.languages.length > 0 ? (
            <div className="mt-4 space-y-3">
              {profile.languages.map((language) => (
                <p
                  key={`${language.name}-${language.level}`}
                  className="flex justify-between gap-4 text-sm text-[#2C2A51]"
                >
                  <span>{language.name}</span>
                  <span className="font-semibold text-[#5A5781]">
                    {language.level}
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#5A5781]">
              No languages added yet.
            </p>
          )}
        </section>

        {/* Skills are edited as one item per line or comma-separated. */}
        <section className="p-5">
          <h2 className="text-base font-bold text-[#2C2A51]">Skills</h2>

          {isEditing ? (
            <textarea
              value={draftSkills}
              rows={5}
              onChange={(e) => onSkillsChange(e.target.value)}
              placeholder={"Branding\nLogo Design\nUI Design"}
              className="mt-4 w-full resize-none rounded-xl border border-[#DDD9FF] bg-white px-4 py-3 text-sm leading-6 text-[#2C2A51] outline-none transition focus:border-[#0050D4] focus:ring-4 focus:ring-[#0050D4]/10"
            />
          ) : profile.skills && profile.skills.length > 0 ? (
            <div className="mt-4 space-y-2">
              {profile.skills.map((skill) => (
                <p
                  key={skill}
                  className="w-fit rounded-full border border-[#D8D0F5] bg-[#F8F5FF] px-3 py-1.5 text-left text-sm font-medium text-[#2C2A51]"
                >
                  {skill}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#5A5781]">No skills added yet.</p>
          )}
        </section>
      </div>
    </aside>
  );
}

export default ProfileDetails;
