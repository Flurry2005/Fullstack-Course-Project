import { CheckCircle, Package, RotateCcw, XCircle } from "lucide-react";
import type { OrderStatus } from "../../MyOrdersPage/MyOrders";
import React, { useEffect, useState } from "react";

type StatusBadgeProps = {
  status: string | undefined;
};

function StatusBadge({ status }: StatusBadgeProps) {
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

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    (status ?? "In Progress") as OrderStatus,
  );

  useEffect(() => {
    if (status) {
      setCurrentStatus(status as OrderStatus);
    }
  }, [status]);

  const statusData = statusConfig[currentStatus];

  return (
    <div
      className={`${status ? statusData.classes : "text-[#3a3838] bg-[#7B9CFF]"} font-semibold flex items-center gap-0.5  shadow-md h-fit w-fit text-[.7rem] rounded-sm px-2 p-1 `}
    >
      {statusData?.icon}
      {status ? statusData.label : "Unknown"}
    </div>
  );
}

export default StatusBadge;
