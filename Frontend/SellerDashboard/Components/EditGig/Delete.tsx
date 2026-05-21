import type { Gig } from "../../../types/Gig";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";
import deleteIcon from "../../../assets/delete-icon-white.svg";

type OverviewProps = {
  gig: Gig;
  setDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
  getGig: () => void;
};

function Delete({ gig, setDeleteState, getGig }: OverviewProps) {
  const deleteGig = async () => {
    const header = { "Content-type": "Application/json" };
    const gigId = gig._id;
    const body = JSON.stringify({ id: gigId });
    await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig"}`,
      { method: "DELETE", headers: header, body: body, credentials: "include" },
    );
    getGig();
  };
  return (
    <div
      className={`z-100 md:w-[25vw] w-full h-fit left-1/2 -translate-x-1/2 md:absolute fixed border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-red-400 shadow-md p-6 rounded-2xl text-white">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-3">
              <img src={deleteIcon} alt="Delete" className="w-8 h-8" />
              <h3 className="font-bold text-xl">Delete Gig</h3>
            </span>
            <p>Warning! This action cannot be undone.</p>
            <span className="flex md:justify-between justify-center gap-10 flex-wrap mt-6">
              <span
                className=""
                onClick={() => {
                  setDeleteState(false);
                }}
              >
                <CancelButton />
              </span>
              <span
                className=""
                onClick={() => {
                  deleteGig();
                  setDeleteState(false);
                }}
              >
                <UpdateButton text={"Confirm"} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
