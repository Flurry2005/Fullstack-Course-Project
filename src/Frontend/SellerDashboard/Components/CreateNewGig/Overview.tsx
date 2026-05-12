import tipsIcon from "../../../assets/light-bulb-icon.svg";
import { useState } from "react";
import { useRef } from "react";
import removeIcon from "../../../assets/x-icon.svg";
import circleIcon from "../../../assets/circle-check-icon.svg";
import bookIcon from "../../../assets/book-icon.svg";
import type { Gig as NewGig } from "../../../types/Gig";
import { useEffect } from "react";
import { categories } from "./Categories";

type overviewProps = {
  newGig: NewGig;
  setTitle: (title: string) => void;
  setCategory: (category: { main?: string; sub?: string }) => void;
  setFinalTags: (tags: string[]) => void;
};

function Overview({
  setTitle,
  setCategory,
  setFinalTags,
  newGig,
}: overviewProps) {
  const [mainCategory, setMainCategory] = useState(categories[0].main.name);
  const [subCategory, setSubCategory] = useState(categories[0].subs[0].sub);

  useEffect(() => {
    if (!newGig.category?.main || !newGig.category?.sub) {
      setCategory({
        main: categories[0].main.name,
        sub: categories[0].subs[0].sub,
      });
    }
  }, []);
  const tagRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const newTag = tagRef.current?.value.trim();
    if (!newTag) return;

    setFinalTags([...(newGig.tags || []), newTag]);
    if (tagRef.current) tagRef.current.value = "";
  };

  const removeTag = (index: number) => {
    setFinalTags([...(newGig.tags || []).filter((_, i) => i !== index)]);
  };

  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value);

    const found = categories.find((cat) => cat.main.name === value);
    const firstSub = found?.subs[0];

    if (!firstSub) return;

    setSubCategory(firstSub.sub);
    setCategory({ main: value, sub: firstSub.sub });
  };

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);

    setCategory({ main: mainCategory, sub: value });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-4xl">Overview </h2>
        <p className="text-[#464555] text-xl">
          Provide a snapshot of your services and what clients can expect.
        </p>
      </div>
      <div className="md:flex justify-center gap-6 grid grid-cols-1 md:w-screen">
        <div className="flex flex-col gap-6 md:w-[50vw]">
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
              onChange={(e) => setTitle(e.target.value)}
              className="p-6 border border-[#C7C4D8] rounded-lg text-[#6B7280] text-xl"
              value={newGig?.title || ""}
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
                className="p-3 border border-[#C7C4D8] rounded-lg text-[#6B7280]"
                onChange={(e) => handleMainCategoryChange(e.target.value)}
                value={newGig.category?.main || mainCategory}
              >
                {categories.map((cat) => (
                  <option key={cat.main.name} value={cat.main.name}>
                    {cat.main.name}
                  </option>
                ))}
              </select>
              <select
                className="p-3 border border-[#C7C4D8] rounded-lg text-[#6B7280]"
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                value={newGig.category?.sub || subCategory}
              >
                {(
                  categories.find(
                    (cat) =>
                      cat.main.name === (newGig.category?.main || mainCategory),
                  )?.subs || []
                ).map((sub) => (
                  <option key={sub.sub} value={sub.sub}>
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
                {newGig.tags &&
                  newGig.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="flex items-center gap-1 bg-[#D0E1FB] px-6 py-1 rounded-lg min-h-9 font-medium text-[#54647A]"
                    >
                      {tag}
                      <span
                        className="ml-2 font-bold text-neutral-400 cursor-pointer"
                        onClick={() => removeTag(index)}
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
                className={`text-[#6B7280] p-3 rounded-lg border border-[#C7C4D8]`}
              />
              <button
                disabled={
                  Array.isArray(newGig.tags) && newGig.tags?.length === 5
                }
                onClick={() => addTag()}
                className={`${Array.isArray(newGig.tags) && newGig.tags?.length === 5 ? "opacity-50" : "opacity-100"} place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6`}
              >
                Create Tag
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:w-[20vw]">
          <div className="flex flex-col gap-3 bg-[#4F46E5] p-6 rounded-2xl text-[#DAD7FF]">
            <span className="flex items-center gap-1 font-bold text-xl">
              <img src={tipsIcon} className="w-6 h-6" />
              Pro Tips
            </span>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-1">
                <img src={circleIcon} className="w-6 h-6" />
                Titles starting with "I will" perform 15% better in search
                rankings.
              </li>
              <li className="flex gap-1">
                <img src={circleIcon} className="w-6 h-6" />
                Use 2-3 word tags for better specificity and visibility.
              </li>
              <li className="flex gap-1">
                <img src={circleIcon} className="w-6 h-6" />
                Correct categorization ensures you appear in filtered results.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 bg-[#EAEDFF] p-6 border border-[#C7C4D8]/15 rounded-2xl text-[#DAD7FF]">
            <span className="font-semibold text-[#464555]">Need help?</span>
            <span className="flex items-center gap-1 font-semibold text-[#3525CD]">
              {" "}
              <img src={bookIcon} className="w-6 h-6" />
              View Seller Guidelines
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
