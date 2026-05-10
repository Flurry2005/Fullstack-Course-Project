import type { Gig } from "../../types/Gig";
import CancelButton from "./CancelButton";
import PackageBar from "./PackageBar";
import UpdateButton from "./UpdateButton";

type Pricing = {
  gig: Gig;
  setGig: React.Dispatch<React.SetStateAction<Gig | undefined>>;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

function Pricing({ gig, setGig, setEditState, setConfirm }: Pricing) {
  const handleUpdate = () => {
    setGig((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
      };
    });
    setEditState(false);
    setConfirm(true);
  };
  return (
    <div
      className={`z-100 md:w-[50vw] w-full h-fit left-1/2 -translate-x-1/2 absolute border border-[#ACA8D7]/15 bg-[#f9f5ff]/50 p-6 rounded-2xl`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 shadow-md border border-[#ACA8D7]/15 bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Pricing & Packages</h3>
            <p>Define your packages to offer variety to your clients.</p>
          </div>

          <div className="flex flex-col gap-3">
            {gig?.basic && (
              <PackageBar
                editState={true}
                name="Basic"
                plan={gig.basic}
                setGig={setGig}
                gig={gig}
              />
            )}
            {gig?.standard && (
              <PackageBar
                editState={true}
                name="Standard"
                plan={gig.standard}
                setGig={setGig}
                gig={gig}
              />
            )}
            {gig?.premium && (
              <PackageBar
                editState={true}
                name="Premium"
                plan={gig.premium}
                setGig={setGig}
                gig={gig}
              />
            )}
          </div>
        </div>
        <span className="flex">
          <span onClick={() => setEditState(false)}>
            {" "}
            <CancelButton />
          </span>
          <span className="ml-auto" onClick={handleUpdate}>
            <UpdateButton text={"Update"} />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Pricing;
