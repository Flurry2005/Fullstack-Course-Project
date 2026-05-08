
import lightIcon from "../../assets/light-bulb-icon.svg";
import type { Gig } from "../../types/Gig";
import CancelButton from "./CancelButton";
import UpdateButton from "./UpdateButton";

type ConfirmProps = {
  setConfirmConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  gig: Gig;
};
function Confirm({ setConfirmConfirm, setConfirm, gig }: ConfirmProps) {
  const updateGig = async () => {
    const header = { "Content-type": "Application/json" };
    const body = JSON.stringify(gig);
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig"}`,
      { method: "PUT", headers: header, body: body, credentials: "include" },
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute bg-[#f9f5ff]/50 p-6 rounded-2xl flex items-center justify-center">
      <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-[#4F46E5] text-white p-6 rounded-2xl w-full">
        <span className="font-semibold flex gap-3 items-center text-xl">
          <img src={lightIcon} className="w-8 h-8" />
          Are you sure?
        </span>
        <p>
          Your gig will be reviewed and set to "pending" if you apply any
          changes.
        </p>
        <span className="flex mt-6">
          <span
            className="mr-auto"
            onClick={() => setConfirmConfirm(false)}
          >
            <CancelButton />
          </span>
          <span
            className="ml-auto"
            onClick={() => {
              updateGig();
              setConfirm(false);
              setConfirmConfirm(false);
            }}
          >
            <UpdateButton text={"Confirm"} />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Confirm;
