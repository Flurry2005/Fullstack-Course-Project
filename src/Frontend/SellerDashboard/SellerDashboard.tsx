import Navbar from "../NavBar";
import Footer from "../Footer";
import OrderCard from "./OrderCard";
import MessageCard from "./MessageCard";
import GigCard from "./GigCard";
import profileRatingsIcon from "../assets/profile-ratings-icon.svg";
import createNewIcon from "../assets/create-plus-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { useEffect, useState } from "react";
import type { Gig } from "../types/Gig";
import { useSocket } from "../Context/useSocket";
import { useOrders } from "../Context/useOrders";

function SellerDashBoard() {
  const { setActiveOrder } = useSocket();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { user } = useAuth();
  const [gigs, setGigs] = useState<Gig[]>();
  const [gigsLoaded, setGigsLoaded] = useState(false);

  const getGigs = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/user/"}${user?._id}`,
    );
    const data = await response.json();
    console.log(data);
    response.ok && setGigs(data);
    setGigsLoaded(true);
  };

  const getOrders = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/orders/"}${user?._id}`,
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getGigs();
  }, []);
  return (
    <>
      <Navbar />

      {/* Dashboard header */}
      <main className="flex flex-col gap-10 bg-[#f9f5ff] p-6 w-full">
        <section className="flex flex-col gap-3">
          <h2 className="text-[#2C2A51] text-5xl">Seller Dashboard</h2>
          <h3 className="text-[#5A5781] text-2xl">
            Good morning Johan. Here's your craft at a glance.
          </h3>
        </section>

        {/* Statistics */}
        <section className="gap-6 grid grid-cols-1 md:grid-cols-4">
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Total Earnings</span>
            <span className="text-3xl">$12,840</span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Pending Clearance</span>
            <span className="text-[#0050D4] text-3xl">$1,250</span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Profile Rating</span>
            <span className="flex gap-1 text-3xl">
              4.9{" "}
              <img
                src={profileRatingsIcon}
                className="place-self-center w-5 h-5"
              />
            </span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Response Time</span>
            <span className="text-3xl">1 hour</span>
          </div>
        </section>

        {/*Active orders and messages*/}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-3">
            <div className="flex place-items-center">
              <h2 className="px-3 text-[#2C2A51] text-3xl">Active Orders</h2>
              <span className="mr-3 ml-auto text-[#0050D4] text-xl">
                View All (8)
              </span>
            </div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <OrderCard />
              <OrderCard />
            </div>
          </section>
          <section className="flex flex-col gap-6 bg-[#ACA8D7]/10 p-6 border-[#ACA8D7]/15 border-2 rounded-2xl">
            <div className="flex">
              <h2 className="text-[#2C2A51] text-2xl align-middle">Messages</h2>
              <span className="place-content-center bg-linear-to-br from-[#4F46E5] to-[#6f16ae4f] ml-auto px-3 rounded-2xl w-fit font-semibold text-white text-sm">
                {
                  orders
                    ?.filter((order) => order.chathistory.length > 0)
                    ?.filter((order) =>
                      order.chathistory.some(
                        (message) => !message.readBy.includes(user!._id),
                      ),
                    ).length
                }{" "}
                New
              </span>
            </div>
            {orders
              ?.filter((order) => order.chathistory.length > 0)
              ?.filter((order) =>
                order.chathistory.some(
                  (message) => !message.readBy.includes(user!._id),
                ),
              )
              ?.sort(
                (a, b) =>
                  new Date(
                    b.chathistory[b.chathistory.length - 1].time,
                  ).getTime() -
                  new Date(
                    a.chathistory[a.chathistory.length - 1].time,
                  ).getTime(),
              )
              ?.slice(0, 3)
              ?.map((order) => (
                <MessageCard key={order._id} read={false} order={order} />
              ))}

            {orders
              ?.filter((order) => order.chathistory.length > 0)
              ?.filter((order) =>
                order.chathistory.some(
                  (message) => !message.readBy.includes(user!._id),
                ),
              )?.length === 0 && <p>No new messages</p>}

            <button
              className="p-3 border border-[#0050D4]/20 rounded-xl font-bold text-[#0050D4] cursor-pointer"
              onClick={() => {
                navigate("/messages");
              }}
            >
              Go to Inbox
            </button>
          </section>
        </div>

        {/*"My Gigs"-section*/}
        <section className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-4xl">My Gigs</h2>
              <h3 className="text-xl">
                Manage and promote your top-rated services{" "}
              </h3>
            </div>
            <Link
              to="/dashboard/create"
              className="flex items-center place-self-end gap-1 bg-linear-to-r from-[#4F46E5] to-[#4e46e5c2] sm:ml-auto px-3 md:px-9 py-3 rounded-xl w-fit font-semibold text-white md:text-xl"
            >
              <img
                src={createNewIcon}
                className="brightness-0 invert w-6 h-6"
              />
              Create New Gig
            </Link>
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            {!gigsLoaded && <span>Loading gigs..</span>}
            {gigs?.map((gig) => (
              <Link
                to={`/services/${gig.category?.main_slug}/${gig.category?.sub_slug}/${gig._id}`}
                key={gig._id}
              >
                <GigCard
                  id={gig?._id}
                  title={gig?.title}
                  views={13}
                  checkouts={10}
                  price={gig?.basic?.price}
                  rating={5.3}
                  reviewerAmount={120}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default SellerDashBoard;
