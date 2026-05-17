import { CheckCircle, Clock, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../MyOrders";

const tierColors = {
  basic: "bg-[#ede9fe] text-[#5b4dc7]",
  standard: "bg-[#dbeafe] text-[#1857f7]",
  premium: "bg-[#fef3c7] text-[#d97706]",
};

function OrderCard({
  order,
  currentUsername,
}: {
  order: Order;
  currentUsername: string;
}) {
  const navigate = useNavigate();
  const isBuyer = order.buyerUsername === currentUsername;
  const dueDate = new Date(order.dueDate);
  const isOverdue = !order.delivered && dueDate < new Date();
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <article
      onClick={() => navigate(`/orders/${order._id}`)}
      className="bg-white hover:shadow-md p-6 rounded-2xl transition hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${tierColors[order.gigTier]}`}
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

        {/* Status */}
        {order.delivered ? (
          <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full font-semibold text-green-600 text-xs shrink-0">
            <CheckCircle size={12} />
            Delivered
          </span>
        ) : isOverdue ? (
          <span className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full font-semibold text-red-500 text-xs shrink-0">
            <Clock size={12} />
            Overdue
          </span>
        ) : (
          <span className="flex items-center gap-1.5 bg-[#f4f0fb] px-3 py-1 rounded-full font-semibold text-[#5b4dc7] text-xs shrink-0">
            <Package size={12} />
            In Progress
          </span>
        )}
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

        <div className="text-[#8a8a9a] text-xs text-right">
          {order.delivered ? (
            <span>
              Completed{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          ) : (
            <span className={isOverdue ? "text-red-500 font-semibold" : ""}>
              Due{" "}
              {isOverdue
                ? `${Math.abs(daysUntilDue)} days ago`
                : daysUntilDue === 0
                  ? "today"
                  : `in ${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
