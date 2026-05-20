import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

import type { Gig } from "../../types/Gig";

type StatisticsProps = {
  gigs: Gig[];
  subject: string;
};

type viewType = "daily" | "monthly" | "yearly";

function Statistics({ gigs }: StatisticsProps) {
  const [timeAspect, setTimeAspect] = useState<viewType>("daily");

  const dates: Date[] = (gigs ?? []).flatMap((gig) =>
    Object.values(gig.views ?? {})
      .map((v) => new Date(v as string | number | Date))
      .filter((d) => !Number.isNaN(d.getTime())),
  );

  const viewsByTime = dates.reduce<Record<string, number>>((visitor, date) => {
    const dayKey = date.toISOString().slice(0, 10);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const yearKey = `${date.getFullYear()}`;

    const key =
      timeAspect === "daily"
        ? dayKey
        : timeAspect === "monthly"
          ? monthKey
          : yearKey;

    visitor[key] = (visitor[key] ?? 0) + 1;
    return visitor;
  }, {});

  const data = Object.entries(viewsByTime)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => ({
      name:
        timeAspect === "daily"
          ? new Date(`${key}T00:00:00`).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : timeAspect === "monthly"
            ? new Date(`${key}-01`).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : key,
      Views: count,
    }));

  return (
    <>
      <div className=" flex flex-col gap-3 h-full w-full">
        <div className="flex flex-col gap-3">
          <h2 className="text-[#2C2A51] font-semibold text-2xl">
            Views Over Time
          </h2>
          <p>See how many users viewed your services over time.</p>
          <div className="flex gap-2 font-semibold text-sm">
            <button
              type="button"
              onClick={() => setTimeAspect("daily")}
              className={`px-3 py-1 rounded-lg border cursor-pointer ${timeAspect === "daily" ? "bg-[#0050D4] text-white border-[#0050D4]" : "bg-white text-[#2C2A51] border-[#ACA8D7]/35"}`}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setTimeAspect("monthly")}
              className={`px-3 py-1 rounded-lg border cursor-pointer ${timeAspect === "monthly" ? "bg-[#0050D4] text-white border-[#0050D4]" : "bg-white text-[#2C2A51] border-[#ACA8D7]/35"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setTimeAspect("yearly")}
              className={`px-3 py-1 rounded-lg border cursor-pointer ${timeAspect === "yearly" ? "bg-[#0050D4] text-white border-[#0050D4]" : "bg-white text-[#2C2A51] border-[#ACA8D7]/35"}`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="w-full px-3 bg-[#f9f5ff] rounded-2xl p-1 font-semibold h-full ml-auto flex">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Views"
                stroke="#0050D4"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
export default Statistics;
