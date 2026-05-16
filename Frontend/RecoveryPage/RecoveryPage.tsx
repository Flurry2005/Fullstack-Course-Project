import React from "react";

import NavigationLink from "../NavBar/NavbarComponents/NavigationLink";
import { RotateCcw, Lock } from "lucide-react";

function RecoveryPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-[#f9f5ff] w-screen h-screen">
      <div className="flex flex-col items-center bg-white rounded-4xl w-[25%] h-[75%]">
        <div className="flex justify-center items-center bg-blue-500 rounded-xl w-17 h-17">
          <img
            src="/RecoveryPage/Icon.png"
            alt="Arrow going 360 degrees with lock in the middle"
          />
        </div>
      </div>
      <p>
        NEED HELP?
        <span className="underline">
          <NavigationLink
            to={"/services"}
            text={"CONTACT PROJECTNAME SUPPORT"}
          />
        </span>
      </p>
    </div>
  );
}

export default RecoveryPage;
