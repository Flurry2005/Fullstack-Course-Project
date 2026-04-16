import Navbar from "../NavBar";
import Footer from "../Footer";
import OrderCard from "./OrderCard";
import MessageCard from "./MessageCard";
import GigCard from "./GigCard";
import profileRatingsIcon from "../assets/profile-ratings-icon.svg";

function Main() {
  return (
    <>
      <Navbar />

      {/* Dashboard header */}
      <main className="flex flex-col w-full bg-[#f9f5ff] p-6 gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-5xl text-[#2C2A51]">Seller Dashboard</h2>
          <h3 className="text-2xl text-[#5A5781]">
            Good morning Johan. Here's your craft at a glance.
          </h3>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className=" w-full flex flex-col bg-white p-6 border-2 border-[#ACA8D7]/15 rounded-2xl">
            <span className="text-[#5A5781]">Total Earnings</span>
            <span className="text-3xl">$12,840</span>
          </div>
          <div className="w-full flex flex-col bg-white p-6 border-2 border-[#ACA8D7]/15 rounded-2xl">
            <span className="text-[#5A5781]">Pending Clearance</span>
            <span className="text-3xl text-[#0050D4]">$1,250</span>
          </div>
          <div className=" w-full flex flex-col bg-white p-6 border-2 border-[#ACA8D7]/15 rounded-2xl">
            <span className="text-[#5A5781]">Profile Rating</span>
            <span className="text-3xl flex gap-1">
              4.9{" "}
              <img
                src={profileRatingsIcon}
                className="w-5 h-5 place-self-center"
              />
            </span>
          </div>
          <div className="w-full flex flex-col bg-white p-6 border-2 border-[#ACA8D7]/15 rounded-2xl">
            <span className="text-[#5A5781]">Response Time</span>
            <span className="text-3xl">1 hour</span>
          </div>
        </section>

        {/*Active orders and messages*/}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-3">
            <div className="flex place-items-center">
              <h2 className="text-3xl px-3 text-[#2C2A51]">Active Orders</h2>
              <span className="ml-auto text-[#0050D4] text-xl mr-3">
                View All (8)
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OrderCard />
              <OrderCard />
            </div>
          </section>
          <section className="bg-[#ACA8D7]/10 p-6 rounded-2xl gap-6 flex flex-col border-2 border-[#ACA8D7]/15">
            <div className="flex">
              <h2 className="text-2xl text-[#2C2A51] align-middle">Messages</h2>
              <span className="w-fit ml-auto px-3 place-content-center rounded-2xl text-sm text-white bg-[#702AE1]">
                3 New
              </span>
            </div>
            <MessageCard read={false} />
            <MessageCard read={true} />
            <MessageCard read={true} />

            <button className="border rounded-xl p-3 border-[#0050D4]/20 text-[#0050D4] font-bold">
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
            <button className="flex font-medium items-center md:text-xl border-none  text-white bg-linear-to-r from-[#702AE1] to-[#D0B8FF] rounded-xl w-fit sm:ml-auto md:px-9 px-3 place-self-end py-3 border">
              Create New Gig
            </button>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            <GigCard
              title={"I will teach you how to fish and master bait"}
              views={13}
              checkouts={10}
              price={1000}
              rating={5.3}
              reviewerAmount={120}
            />
            <GigCard
              title={"I will teach you fishing"}
              views={15}
              checkouts={11}
              price={599}
              rating={3.2}
              reviewerAmount={9}
            />
            <GigCard
              title={"I will teach you about bait"}
              views={78}
              checkouts={9}
              price={299}
              rating={2.1}
              reviewerAmount={12}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Main;
