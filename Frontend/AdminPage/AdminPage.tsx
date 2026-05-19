import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Calendar, UserSearch } from "lucide-react";
import QueueCard from "./queueCard";
import type { User } from "../types/User";
import type { Order } from "../types/Order";

function AdminPage() {
  const [gigs, setGigs] = useState<Order[] | null>([]);
  const [users, setUsers] = useState<User[] | null>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getTodaysDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/get-gigs",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        setGigs(data.gigs);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/get-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchGigs();
    fetchUsers();
  }, []);

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
            <div className="flex-col bg-white shadow m-10 rounded-2xl w-70 h-50">
              <div className="flex justify-center items-center bg-blue-50 m-4 rounded-2xl w-15 h-15">
                <img
                  className="p-3 w-fit h-fit"
                  src="/admin1.png"
                  alt="money"
                />
              </div>
            </div>
            <div className="bg-white shadow m-10 rounded-2xl w-70 h-50"></div>
            <div className="bg-white shadow m-10 rounded-2xl w-70 h-50"></div>
            <div className="bg-white shadow m-10 rounded-2xl w-70 h-50"></div>
          </div>

          <div className="flex gap-35 mt-10 w-full h-full">
            <div className="flex flex-col w-2/3 h-fit">
              <div className="flex justify-between items-center mb-5 w-full h-fit">
                <h3 className="font-semibold text-2xl">
                  Service Moderation Queue
                </h3>
                <p className="font-semibold text-[#0050D4] text-sm cursor-pointer">
                  View All →
                </p>
              </div>
              {gigs &&
                gigs.map((gig) => (
                  <QueueCard key={gig._id || gig.sellerUsername} gig={gig} />
                ))}
            </div>
            <div className="flex flex-col gap-5 w-1/3">
              <div className="bg-[#E3DFFF] px-10 py-5 rounded-2xl w-full h-90">
                <h2 className="text-2xl">User Management</h2>
                <div className="flex items-center gap-2 bg-white mt-5 p-2 rounded-lg">
                  <UserSearch className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search sellers or buyers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:border-transparent border-none focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col gap-5 mt-5">
                  {users &&
                    users
                      .filter((user) => user.username.includes(searchTerm))
                      .map((user) => (
                        <div className="flex">
                          <span className="flex justify-center bg-purple-200 mr-2 p-2 rounded-full w-10 h-10 font-bold text-center">
                            {user.username.charAt(0)}
                          </span>
                          <div className="flex flex-col">
                            <p>{user.username}</p>
                          </div>
                        </div>
                      ))
                      .slice(0, 3)}
                </div>
                <div className="border-gray-300 border-b w-full h-5"></div>
              </div>
              <div className="bg-amber-200 w-full h-80"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminPage;
