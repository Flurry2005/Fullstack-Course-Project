import type { Gig } from "../../types/Gig";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";
import deleteIcon from "../../assets/delete-icon-white.svg";

type OverviewProps = {
  gig: Gig;
  setDeleteState: React.Dispatch<React.SetStateAction<boolean>>;
};

function Delete({ gig, setDeleteState }: OverviewProps) {
  const deleteGig = async () => {
    const header = { "Content-type": "Application/json" };
    const gigId = gig._id;
    const body = JSON.stringify({ id: gigId });
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig"}`,
      { method: "DELETE", headers: header, body: body, credentials: "include" },
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute  border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col  gap-6">
        <div className="flex flex-col gap-6 shadow-md  text-white bg-red-400 p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-3">
              <img src={deleteIcon} alt="Delete" className="w-8 h-8" />
              <h3 className="text-xl font-bold">Delete Gig</h3>
            </span>
            <p>Warning! This action cannot be undone.</p>
            <span className="flex mt-6">
              <span
                className="mr-auto"
                onClick={() => {
                  setDeleteState(false);
                }}
              >
                <CancelButton />
              </span>
              <span
                className="ml-auto"
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
