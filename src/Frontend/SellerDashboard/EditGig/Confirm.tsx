import lightIcon from "../../assets/light-bulb-icon.svg";

type ConfirmProps = {
      setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}
function Confirm({setConfirm} : ConfirmProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
   
                <div className="bg-[#4F46E5] w-80 text-white border rounded-2xl gap-3 flex flex-col p-6">
                    <span className="font-semibold flex gap-3 items-center text-xl"><img src={lightIcon} className="w-8 h-8"/>Are you sure?</span>
                    <p>Your gig will be reviewed and set to "pending" if you apply any changes.</p>
                    <span className="flex">
                         <button onClick={() => setConfirm(false)} className="bg-white mr-auto font-semibold text-[#464555] px-6 rounded-lg">Return</button>
                        <button onClick={() => setConfirm(false)} className="bg-white ml-auto font-semibold text-[#464555] px-6 rounded-lg">Apply</button>
                    </span>
                </div>
            </div>
        
    );
}

export default Confirm;