import React from "react";
import NavBar from "../NavBar/NavBar";
import { Calendar } from "lucide-react";
import QueueCard from "./queueCard";

function AdminPage() {
  function getTodaysDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <>
      <NavBar></NavBar>

      <main className="flex bg-[#F9F5FF]">
        <aside className="bg-[#F8FAFC] shadow-2xl w-80 min-h-screen"></aside>

        <div className="flex flex-col mx-auto mt-12 px-12 container">
          <header className="mb-10">
            <h1 className="font-semibold text-4xl">Admin Overview</h1>

            <div className="flex justify-between">
              <p className="mt-2 text-[#5A5781] text-m">
                Welcome back, Administrator. Here's what's happening today.
              </p>

              <div className="flex justify-center items-center space-x-1 bg-[#E3DFFF] p-2 px-2 rounded-xl w-fit h-10">
                <Calendar />
                <p className="font-semibold">{getTodaysDate()}</p>
              </div>
            </div>
          </header>

          <div className="flex justify-center shadow">
            <div className="bg-blue-300 m-10 rounded-2xl w-70 h-50"></div>
            <div className="bg-blue-300 m-10 rounded-2xl w-70 h-50"></div>
            <div className="bg-blue-300 m-10 rounded-2xl w-70 h-50"></div>
            <div className="bg-blue-300 m-10 rounded-2xl w-70 h-50"></div>
          </div>

          <div className="flex justify-between mt-10 w-full h-full">
            <div className="flex flex-col w-2/3 h-fit">
              <div className="flex justify-between items-center w-full h-fit">
                <h3 className="font-semibold text-2xl">
                  Service Moderation Queue
                </h3>
                <p className="font-semibold text-[#0050D4] text-sm cursor-pointer">
                  View All →
                </p>
              </div>
              <QueueCard></QueueCard>
            </div>
            <div>SIDEBAR</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminPage;
