import Navbar from "../NavBar";
import Footer from "../Footer";
import OrderCard from "./OrderCard";
import MessageCard from "./RecentMessages";

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
            <span className="text-3xl">4.9 </span>
          </div>
          <div className="w-full flex flex-col bg-white p-6 border-2 border-[#ACA8D7]/15 rounded-2xl">
            <span className="text-[#5A5781]">Response Time</span>
            <span className="text-3xl">1 hour</span>
          </div>
        </section>

        {/*Active orders and messages*/}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
          <section className="flex flex-col gap-3">
            <div className="flex place-items-center">
              <h2 className="text-3xl px-3 text-[#2C2A51]">Active Orders</h2>
              <span className="ml-auto text-[#0050D4] text-xl mr-3">
                View All (8)
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <OrderCard />
              <OrderCard />
            </div>
          </section>
          <section className="bg-[#ACA8D7]/10 p-6 rounded-2xl gap-6 flex flex-col border-2 border-[#ACA8D7]/15">
            <h2 className="text-3xl text-[#2C2A51]">Messages</h2>
            <MessageCard />
            <MessageCard />
            <MessageCard />
          </section>
        </div>

        {/*"My Gigs"-section*/}
        <section></section>
      </main>

      <Footer />
    </>
  );
}

export default Main;
