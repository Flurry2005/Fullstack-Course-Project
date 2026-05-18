import Footer from "../Footer";

import profileRatingsIcon from "../assets/profile-ratings-icon.svg";
import createNewIcon from "../assets/create-plus-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import { useEffect, useState } from "react";
import type { Gig } from "../types/Gig";
import { useSocket } from "../Context/useSocket";
import { useOrders } from "../Context/useOrders";
import { fetchProfile } from "../utils/GetProfile";
import NavBar from "../NavBar/NavBar";
import OrderCard from "./Components/OrderCard";
import MessageCard from "./Components/MessageCard";
import GigCard from "./Components/GigCard";

function SellerDashBoard() {
  const { setActiveOrder } = useSocket();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { user } = useAuth();
  const [gigs, setGigs] = useState<Gig[]>();
  const [gigsLoaded, setGigsLoaded] = useState(false);
  const timeOfDay = new Date().getHours();
  const [profilePictures, setProfilePictures] = useState<
    Record<string, string>
  >({});
  const [maxOrders, setMaxOrders] = useState(2);

  useEffect(() => {
    const loadPictures = async () => {
      if (!orders || !user) return;

      const uniqueUsers = [
        ...new Set(
          orders.map((order) =>
            order.sellerUsername === user.username
              ? order.buyerUsername
              : order.sellerUsername,
          ),
        ),
      ];

      const entries = await Promise.all(
        uniqueUsers.map(async (username) => {
          const profile = await fetchProfile(username);

          return [username, profile?.profilePictureUrl];
        }),
      );

      setProfilePictures(Object.fromEntries(entries));
    };

    loadPictures();
  }, [orders, user]);

  const getGigs = async () => {
    if (!user?.username) return;

    const response = await fetch(
      `${import.meta.env.VITE_DEV === "true" ? "http://localhost:3000" : "https://fullstackapi.liamjorgensen.dev"}/api${"/gig/seller/"}${user?.username}`,
    );
    const data = await response.json();
    console.log(data);
    response.ok && setGigs(data);
    setGigsLoaded(true);
  };

  useEffect(() => {
    if (!user?.username) return;
    getGigs();
    setActive(true);
  }, [user]);

  const greeting =
    timeOfDay < 12
      ? "Good morning"
      : timeOfDay < 18
        ? "Good afternoon"
        : "Good evening";

  const fullText = `${greeting} ${user?.fullname}. Here's your craft at a glance.`;

  return (
    <div className="bg-[#f9f5ff]">
      <NavBar />

      {/* Dashboard header */}
      <main className="flex flex-col gap-10 bg-[#f9f5ff] mx-auto p-6 w-full container">
        <section
          className={` flex flex-col gap-3 
          
          `}
        >
          <h2 className="text-[#2C2A51] text-4xl">Dashboard</h2>
          <h3 className="flex flex-wrap text-[#5A5781] text-2xl">
            {fullText.split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-500 ${
                  active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${index * 40}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h3>
        </section>

        {/* Statistics */}
        <section className="gap-6 grid grid-cols-1 md:grid-cols-4">
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Total Earnings</span>
            <span className="font-semibold text-3xl">$12,840</span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Pending Clearance</span>
            <span className="font-semibold text-[#0050D4] text-3xl">
              $1,250
            </span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Seller Rating</span>
            <span className="flex gap-1 font-semibold text-3xl">
              {gigs
                ? (
                    gigs
                      ?.map((gig) => gig.rating || 0)
                      .reduce((a, b) => a + b, 0) / (gigs?.length || 1)
                  )
                    .toFixed(1)
                    .toString() || "0.0"
                : "0.0"}
              <img
                src={profileRatingsIcon}
                className="place-self-center w-5 h-5"
              />
            </span>
          </div>
          <div className="flex flex-col bg-white p-6 border-[#ACA8D7]/15 border-2 rounded-2xl w-full">
            <span className="text-[#5A5781]">Response Time</span>
            <span className="font-semibold text-3xl">1 hour</span>
          </div>
        </section>

        {/*Active orders and messages*/}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-3">
            <div className="flex place-items-center">
              <h2 className="px-3 text-[#2C2A51] text-3xl">Active Orders</h2>
              <span className="mr-3 ml-auto text-[#0050D4] text-xl cursor-pointer">
                {/* Show all orders if orders > 2 */}
                {(orders?.filter(
                  (order) => order.sellerUsername === user?.username,
                ).length ?? 0) > 2 && (
                  <span
                    onClick={() =>
                      maxOrders === 2
                        ? setMaxOrders(
                            orders?.filter(
                              (order) =>
                                order.sellerUsername === user?.username,
                            ).length ?? 0,
                          )
                        : setMaxOrders(2)
                    }
                  >
                    {maxOrders === 2 ? "Show All" : "Show Less "}
                    {maxOrders === 2
                      ? " (" +
                        orders?.filter(
                          (order) => order.sellerUsername === user?.username,
                        ).length +
                        ")"
                      : ""}
                  </span>
                )}
              </span>
            </div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {orders
                ?.filter((order) => order.sellerUsername === user?.username)
                .slice(0, maxOrders)
                ?.map((order) => (
                  <OrderCard
                    profilePictures={profilePictures}
                    order={order}
                    gig={gigs?.find(
                      (gig) => String(gig._id) === String(order.gigId),
                    )}
                  />
                ))}
              {orders?.filter(
                (order) => order.sellerUsername === user?.username,
              ).length === 0 && (
                <p className="px-3 font-light">You have no orders</p>
              )}
            </div>
          </section>
          <section className="flex flex-col gap-6 bg-[#ACA8D7]/10 p-6 border-[#ACA8D7]/15 border-2 rounded-2xl h-fit">
            <div className="flex">
              <h2 className="text-[#060607] text-2xl align-middle">Messages</h2>

              {(() => {
                const unreadCount = orders
                  ?.filter((order) => order.chathistory.length > 0)
                  ?.filter((order) =>
                    order.chathistory.some(
                      (message) => !message.readBy.includes(user!._id),
                    ),
                  ).length;
                return unreadCount && unreadCount > 0 ? (
                  <span className="place-content-center bg-linear-to-br from-[#4F46E5] to-[#6f16ae4f] ml-auto px-3 rounded-2xl w-fit font-semibold text-white text-sm">
                    {unreadCount} New
                  </span>
                ) : null;
              })()}
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
                <MessageCard
                  profilePictures={profilePictures}
                  key={order._id}
                  read={false}
                  order={order}
                />
              ))}

            {orders
              ?.filter((order) => order.chathistory.length > 0)
              ?.filter((order) =>
                order.chathistory.some(
                  (message) => !message.readBy.includes(user!._id),
                ),
              )?.length === 0 && <p>No new messages.</p>}

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
                  gig={gig}
                  id={gig?._id}
                  title={gig?.title}
                  views={13}
                  checkouts={10}
                  price={gig?.basic?.price}
                  rating={gig.rating?.toFixed(1).toString() || "0.0"}
                  reviewerAmount={gig.reviews ? gig.reviews.length : 0}
                />
              </Link>
            ))}
          </div>
        </section>
        <Link
          className="bg-amber-300 p-3 w-fit"
          to={"/services/review/6a05f0f3310a915cb83399e5"}
        >
          Test review
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default SellerDashBoard;
