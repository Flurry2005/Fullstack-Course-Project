import { useSearchParams, Link } from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { API_BASE } from "../ProfilePage/profileUtils";
import NavBar from "../NavBar/NavBar";

type PaymentItem = {
  name: string;
  quantity: number;
  amountTotal: number;
  currency: string;
};

type PaymentData = {
  id: string;
  status: string;
  amountTotal: number;
  currency: string;
  customerEmail: string;
  metadata: {
    gigId: string;
    gigPrice: string;
    sellerId: string;
    sellerUsername: string;
    serviceFee: string;
    tier: string;
  };
  items: PaymentItem[];
};

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    async function fetchPayment() {
      try {
        const res = await fetch(`${API_BASE}/api/session/${sessionId}`, {
          credentials: "include",
        });

        const data = await res.json();
        setPayment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayment();
  }, [sessionId]);

  return (
    <div className="flex flex-col bg-[#f9f5ff] min-h-screen">
      <NavBar />

      <main className="flex flex-1 justify-center items-center px-5 py-16">
        <section className="bg-[#F3EEFF] shadow-md border border-[#E3DFFF] rounded-4xl w-full max-w-5xl overflow-hidden">
          <div className="relative px-8 py-10 text-center">
            <div className="top-8 left-8 absolute bg-[#91FEEF]/40 blur-2xl rounded-full w-24 h-24"></div>
            <div className="top-12 right-8 absolute bg-[#635BFF]/20 blur-2xl rounded-full w-28 h-28"></div>

            <div className="relative flex justify-center items-center bg-[#91FEEF] shadow-sm mx-auto mb-6 rounded-full w-24 h-24">
              <i className="text-[#17213A] text-5xl fa-solid fa-check"></i>
            </div>

            <p className="font-semibold text-[#635BFF] text-sm uppercase tracking-[0.25em]">
              Order Confirmed
            </p>

            <h1 className="mt-3 font-bold text-[#17213A] text-4xl">
              Payment Successful
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[#4b4268]">
              Your order has been placed successfully. The seller can now start
              working on your digital service.
            </p>
          </div>

          {loading ? (
            <div className="px-8 pb-10 text-[#4b4268] text-center">
              Loading order details...
            </div>
          ) : payment ? (
            <div className="gap-6 grid lg:grid-cols-[1.4fr_0.9fr] px-8 pb-10">
              <div className="bg-white shadow-sm p-6 rounded-3xl">
                <h2 className="font-semibold text-[#17213A] text-2xl">
                  Order Summary
                </h2>

                <div className="space-y-4 mt-5">
                  {payment.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f9f5ff] p-5 border border-[#E3DFFF] rounded-2xl"
                    >
                      <div className="flex justify-between items-start gap-5">
                        <div>
                          <p className="font-semibold text-[#635BFF] text-sm">
                            {payment.metadata.tier} Package
                          </p>

                          <h3 className="mt-1 font-semibold text-[#17213A] text-xl">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-[#4b4268] text-sm">
                            Sold by{" "}
                            <span className="font-semibold">
                              {payment.metadata.sellerUsername}
                            </span>
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[#4b4268] text-xs">Quantity</p>
                          <p className="font-semibold text-[#17213A] text-lg">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#E9E5FF] mt-6 p-5 rounded-2xl">
                  <div className="flex justify-between py-2 text-[#4b4268]">
                    <span>Gig price</span>
                    <span>${Number(payment.metadata.gigPrice).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between py-2 text-[#4b4268]">
                    <span>Service fee</span>
                    <span>
                      ${Number(payment.metadata.serviceFee).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between mt-3 pt-4 border-[#d7ceff] border-t font-bold text-[#17213A] text-xl">
                    <span>Total paid</span>
                    <span>
                      {formatMoney(payment.amountTotal, payment.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <aside className="bg-white shadow-sm p-6 rounded-3xl">
                <h2 className="font-semibold text-[#17213A] text-2xl">
                  Payment Details
                </h2>

                <div className="space-y-4 mt-5 text-sm">
                  <div className="bg-[#f9f5ff] p-4 rounded-2xl">
                    <p className="text-[#4b4268]">Status</p>
                    <p className="mt-1 font-semibold text-green-600">
                      {payment.status.toUpperCase()}
                    </p>
                  </div>

                  <div className="bg-[#f9f5ff] p-4 rounded-2xl">
                    <p className="text-[#4b4268]">Customer Email</p>
                    <p className="mt-1 font-semibold text-[#17213A] break-all">
                      {payment.customerEmail}
                    </p>
                  </div>

                  <div className="bg-[#f9f5ff] p-4 rounded-2xl">
                    <p className="text-[#4b4268]">Order Reference</p>
                    <p className="mt-1 font-mono text-[#0050D4] text-xs break-all">
                      {payment.id}
                    </p>
                  </div>
                </div>

                <div className="bg-[#91FEEF]/40 mt-6 p-4 rounded-2xl text-[#17213A] text-sm">
                  <i className="mr-2 fa-solid fa-shield-halved"></i>
                  Your test payment was processed securely through Stripe.
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Link
                    to="/"
                    className="bg-[#635BFF] hover:opacity-90 px-6 py-4 rounded-2xl font-semibold text-white text-center transition"
                  >
                    Continue Browsing
                  </Link>

                  <Link
                    to="/messages"
                    className="bg-[#E3DFFF] hover:opacity-90 px-6 py-4 rounded-2xl font-semibold text-[#0050D4] text-center transition"
                  >
                    Message Seller
                  </Link>
                </div>
              </aside>
            </div>
          ) : (
            <div className="px-8 pb-10 text-[#4b4268] text-center">
              Could not load payment details.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default SuccessPage;
