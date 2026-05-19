import type { Gig } from "../../../types/Gig";
import { categories } from "../CreateNewGig/Categories";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";

type OverviewProps = {
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  gig: Gig;
  setGig: React.Dispatch<React.SetStateAction<Gig | undefined>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

import { useState, useMemo, useRef, useEffect } from "react";

function Overview({ setEditState, gig, setGig, setConfirm }: OverviewProps) {
  const [everythingOK, setEverythingOK] = useState(true);

  const [mainCategory, setMainCategory] = useState(gig.category?.main || "");
  const [subCategory, setSubCategory] = useState(gig.category?.sub || "");

  const [title, setTitle] = useState(gig.title || "");

  const [tags, setTags] = useState<string[]>(gig.tags || []);
  const tagRef = useRef<HTMLInputElement>(null);

  const selectedMainCategory = useMemo(
    () => categories.find((cat) => cat.main.name === mainCategory),
    [mainCategory],
  );

  const addTag = () => {
    const newTag = tagRef.current?.value.trim();
    if (!newTag || tags.includes(newTag) || tags.length >= 5) return;
    setTags([...tags, newTag]);
    if (tagRef.current) tagRef.current.value = "";
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    setGig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        title,
        tags,
        category: {
          main: mainCategory,
          sub: subCategory,
        },
      };
    });
    setEditState(false);
    setConfirm(true);
  };

  useEffect(() => {
    if (title.length < 3 || !subCategory || !mainCategory) {
      setEverythingOK(false);
    } else {
      setEverythingOK(true);
    }
  }, [title, mainCategory, subCategory]);

  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Gig Title</h3>
            <p>
              Craft a clear, descriptive title that hightlights your unique
              value proposition.
            </p>
          </div>
          <input
            type="text"
            className="focus:outline-none p-6 border border-[#C7C4D8]/15 rounded-lg text-[#6B7280] text-xl"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            
          />
        </div>
        <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Category</h3>
            <p>
              Select the industry and specialty that best fits your services.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
            <select
              className="p-3 border border-[#C7C4D8]/15 rounded-lg text-[#6B7280]"
              value={mainCategory}
              onChange={(e) => {
                setMainCategory(e.target.value);
                // Reset subcategory when main changes
                setSubCategory("");
              }}
            >
              <option value="" disabled>
                Select main category
              </option>
              {categories.map((cat) => (
                <option key={cat.main.slug} value={cat.main.name}>
                  {cat.main.name}
                </option>
              ))}
            </select>
            <select
              className="p-3 border border-[#C7C4D8]/15 rounded-lg text-[#6B7280]"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!mainCategory}
            >
              <option value="" disabled>
                {mainCategory
                  ? "Select subcategory"
                  : "Select main category first"}
              </option>
              {selectedMainCategory?.subs.map((sub) => (
                <option key={sub.sub_slug} value={sub.sub}>
                  {sub.sub}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-6 bg-white shadow-md p-6 border border-[#ACA8D7]/15 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">Search Tags</h3>
            <p>Add up to 5 tags to help buyers find your Gig. Be specific.</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="flex items-center gap-1 bg-[#D0E1FB] px-6 py-1 rounded-lg min-h-9 font-medium text-[#54647A]"
                >
                  {tag}

                  <span
                    className="ml-2 font-bold text-neutral-400 cursor-pointer"
                    onClick={() =>
                      tags.length > 1 ? removeTag(index) : () => {}
                    }
                    title="Remove tag"
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
            <input
              type="text"
              ref={tagRef}
              className={`text-[#6B7280] p-3 rounded-lg focus:outline-none border border-[#C7C4D8]/15`}
              disabled={tags.length === 5}
              placeholder="Tag"
              onKeyDown={(e) => {
                if (e.key === "Enter") addTag();
              }}
            />
            <button
              disabled={tags.length === 5}
              onClick={addTag}
              className={`${tags.length === 5 ? "opacity-50" : "opacity-100"} place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6`}
            >
              Create Tag
            </button>
          </div>
        </div>
        <span className="flex flex-wrap gap-6 justify-center md:justify-between">
          <span onClick={() => setEditState(false)}>
            {" "}
            <CancelButton />
          </span>
          <span
            className={`${everythingOK ? "opacity-100" : "opacity-50"}`}
            onClick={everythingOK ? handleUpdate : () => {}}
          >
            <UpdateButton text={"Update"} />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Overview;
