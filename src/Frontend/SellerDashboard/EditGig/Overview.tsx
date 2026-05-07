import { categories } from "../CreateNewGig/Categories";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";

type OverviewProps = {
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  confirm: boolean;
};

function Overview({ setEditState, setConfirm, confirm }: OverviewProps) {
  return (
    <div
      className={`${confirm ? "opacity-50" : "opacity-100"} z-10 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Gig Title</h3>
            <p>
              Craft a clear, descriptive title that hightlights your unique
              value proposition.
            </p>
          </div>
          <input
            type="text"
            onChange={(e) => {}}
            className="text-[#6B7280] text-xl p-6 rounded-lg border border-[#C7C4D8]"
            value={""}
          />
        </div>
        <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Category</h3>
            <p>
              Select the industry and specialty that best fits your services.
            </p>
          </div>
          <div className="flex flex-col md:grid gap-6 md:grid-cols-2">
            <select className="text-[#6B7280] p-3 rounded-lg border border-[#C7C4D8]">
              {categories.map((cat) => (
                <option key={cat.main} value={cat.main}>
                  {cat.main}
                </option>
              ))}
            </select>
            <select className="text-[#6B7280] p-3 rounded-lg border border-[#C7C4D8]"></select>
          </div>
        </div>
        <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Search Tags</h3>
            <p>Add up to 5 tags to help buyers find your Gig. Be specific.</p>
            <div className="flex flex-wrap gap-1"></div>
            <input
              type="text"
              className={`text-[#6B7280] p-3 rounded-lg border border-[#C7C4D8]`}
            />
            <button
              className={`place-self-start cursor-pointer py-1 rounded-lg font-semibold text-white bg-[#4F46E5] px-6`}
            >
              Create Tag
            </button>
          </div>
        </div>
        <span className="flex">
          <span onClick={() => setEditState(false)}>
            {" "}
            <CancelButton />
          </span>
          <span className="ml-auto" onClick={() => setConfirm(true)}>
            <UpdateButton/>
          </span>
        </span>
      </div>
    </div>
  );
}

export default Overview;
