import { Clock, CheckCircle, Package, RotateCcw, XCircle } from "lucide-react";
import type { OrderStatus } from "../MyOrders";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Order } from "../../types/Order";

const apiUrl =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

const tierColors = {
  basic: "bg-[#ede9fe] text-[#5b4dc7]",
  standard: "bg-[#dbeafe] text-[#1857f7]",
  premium: "bg-[#fef3c7] text-[#d97706]",
};

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; classes: string }
> = {
  "In Progress": {
    label: "In Progress",
    icon: <Package size={12} />,
    classes: "bg-[#f4f0fb] text-[#5b4dc7]",
  },
  "Confirmed By Seller": {
    label: "Confirmed by Seller",
    icon: <CheckCircle size={12} />,
    classes: "bg-blue-50 text-blue-600",
  },
  Revision: {
    label: "Revision",
    icon: <RotateCcw size={12} />,
    classes: "bg-orange-50 text-orange-500",
  },
  Completed: {
    label: "Completed",
    icon: <CheckCircle size={12} />,
    classes: "bg-green-50 text-green-600",
  },
  Cancelled: {
    label: "Cancelled",
    icon: <XCircle size={12} />,
    classes: "bg-red-50 text-red-500",
  },
};

interface props {
  order: Order;
  currentUsername: string;
  showCompleteButton: boolean;
  onOrderUpdated: (updatedOrder: Order) => void;
}

function OrderCard({
  order,
  currentUsername,
  showCompleteButton,
  onOrderUpdated,
}: props) {
  const navigate = useNavigate();
  const isBuyer = order.buyerUsername === currentUsername;
  const isSeller = order.sellerUsername === currentUsername;
  const dueDate = new Date(order.dueDate);
  const isOverdue =
    order.delivered !== "Completed" &&
    order.delivered !== "Cancelled" &&
    dueDate < new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  const [loading, setLoading] = useState(false);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    (order.delivered ?? "In Progress") as OrderStatus,
  );

  useEffect(() => {
    if (order.delivered) {
      setCurrentStatus(order.delivered as OrderStatus);
    }
  }, [order.delivered]);

  const status = statusConfig[currentStatus];

  const patchOrder = async (endpoint: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/${order._id}/${endpoint}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) onOrderUpdated(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Which action buttons to show
  const showSellerConfirm =
    showCompleteButton &&
    isSeller &&
    (order.delivered === "In Progress" || order.delivered === "Revision");

  const showBuyerActions =
    showCompleteButton && isBuyer && order.delivered === "Confirmed By Seller";

  const showCancelButton =
    showCompleteButton &&
    isBuyer &&
    order.delivered !== "Completed" &&
    order.delivered !== "Cancelled";

  return (
    <article className="bg-white hover:shadow-md p-6 rounded-2xl transition hover:-translate-y-0.5">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${tierColors[order.gigTier as keyof typeof tierColors]}`}
            >
              {order.gigTier}
            </span>
            <span className="text-[#8a8a9a] text-xs">
              {isBuyer ? "Purchased" : "Selling"}
            </span>
          </div>
          <h3 className="font-semibold text-[#2c2a51] text-base truncate leading-snug">
            {order.gigname}
          </h3>
        </div>

        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-xs shrink-0 ${status.classes}`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-[#f0eef8] border-t">
        <div className="flex items-center gap-4 text-[#6f6f9a] text-sm">
          {isBuyer ? (
            <span>
              Seller:{" "}
              <span className="font-medium text-[#2c2a51]">
                {order.sellerUsername}
              </span>
            </span>
          ) : (
            <span>
              Buyer:{" "}
              <span className="font-medium text-[#2c2a51]">
                {order.buyerUsername}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs ${isOverdue ? "text-red-500 font-semibold" : "text-[#8a8a9a]"}`}
          >
            {order.delivered === "Completed" || order.delivered === "Cancelled"
              ? `Closed ${new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
              : isOverdue
                ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? "" : "s"}`
                : daysUntilDue === 0
                  ? "Due today"
                  : `Due in ${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`}
          </span>

          {/* Seller: confirm delivery */}
          {showSellerConfirm && (
            <button
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                patchOrder("confirm-seller");
              }}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition-colors cursor-pointer"
            >
              <CheckCircle size={12} />
              Mark as Delivered
            </button>
          )}

          {/* Buyer: confirm, revise, or cancel */}
          {showBuyerActions && (
            <>
              <button
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  patchOrder("confirm-buyer");
                  navigate(`/services/review/${order.gigId}`);
                }}
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition-colors cursor-pointer"
              >
                <CheckCircle size={12} />
                Confirm
              </button>
              <button
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  patchOrder("revise");
                }}
                className="flex items-center gap-1.5 bg-orange-400 hover:bg-orange-500 disabled:opacity-50 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                Revise
              </button>
            </>
          )}

          {showCancelButton && (
            <button
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                patchOrder("cancel");
              }}
              className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 px-3 py-1.5 rounded-lg font-semibold text-white text-xs transition-colors cursor-pointer"
            >
              <XCircle size={12} />
              Cancel
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
