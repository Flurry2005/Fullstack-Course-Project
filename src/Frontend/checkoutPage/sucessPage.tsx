import { useSearchParams, Link } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { API_BASE } from "../ProfilePage/profileUtils";

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
    <div className="min-h-screen flex flex-col bg-[#f9f5ff]">
      <NavBar />

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#F3EEFF] shadow-md border border-[#E3DFFF]">
          <div className="relative px-8 py-10 text-center">
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#91FEEF]/40 blur-2xl"></div>
            <div className="absolute right-8 top-12 h-28 w-28 rounded-full bg-[#635BFF]/20 blur-2xl"></div>

            <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#91FEEF] shadow-sm">
              <i className="fa-solid fa-check text-5xl text-[#17213A]"></i>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#635BFF]">
              Order Confirmed
            </p>

            <h1 className="mt-3 text-4xl font-bold text-[#17213A]">
              Payment Successful
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[#4b4268]">
              Your order has been placed successfully. The seller can now start
              working on your digital service.
            </p>
          </div>

          {loading ? (
            <div className="px-8 pb-10 text-center text-[#4b4268]">
              Loading order details...
            </div>
          ) : payment ? (
            <div className="grid gap-6 px-8 pb-10 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#17213A]">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">
                  {payment.items.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-[#f9f5ff] p-5 border border-[#E3DFFF]"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-sm font-semibold text-[#635BFF]">
                            {payment.metadata.tier} Package
                          </p>

                          <h3 className="mt-1 text-xl font-semibold text-[#17213A]">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sm text-[#4b4268]">
                            Sold by{" "}
                            <span className="font-semibold">
                              {payment.metadata.sellerUsername}
                            </span>
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-[#4b4268]">Quantity</p>
                          <p className="text-lg font-semibold text-[#17213A]">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-[#E9E5FF] p-5">
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

                  <div className="mt-3 flex justify-between border-t border-[#d7ceff] pt-4 text-xl font-bold text-[#17213A]">
                    <span>Total paid</span>
                    <span>
                      {formatMoney(payment.amountTotal, payment.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#17213A]">
                  Payment Details
                </h2>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="rounded-2xl bg-[#f9f5ff] p-4">
                    <p className="text-[#4b4268]">Status</p>
                    <p className="mt-1 font-semibold text-green-600">
                      {payment.status.toUpperCase()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f9f5ff] p-4">
                    <p className="text-[#4b4268]">Customer Email</p>
                    <p className="mt-1 break-all font-semibold text-[#17213A]">
                      {payment.customerEmail}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f9f5ff] p-4">
                    <p className="text-[#4b4268]">Order Reference</p>
                    <p className="mt-1 break-all font-mono text-xs text-[#0050D4]">
                      {payment.id}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-[#91FEEF]/40 p-4 text-sm text-[#17213A]">
                  <i className="fa-solid fa-shield-halved mr-2"></i>
                  Your test payment was processed securely through Stripe.
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    to="/"
                    className="rounded-2xl bg-[#635BFF] px-6 py-4 text-center font-semibold text-white transition hover:opacity-90"
                  >
                    Continue Browsing
                  </Link>

                  <Link
                    to="/messages"
                    className="rounded-2xl bg-[#E3DFFF] px-6 py-4 text-center font-semibold text-[#0050D4] transition hover:opacity-90"
                  >
                    Message Seller
                  </Link>
                </div>
              </aside>
            </div>
          ) : (
            <div className="px-8 pb-10 text-center text-[#4b4268]">
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
