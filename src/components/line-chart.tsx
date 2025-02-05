import { useState } from "react";
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  name: string;
  month: string;
  uv: number;
  pv: number;
  amt: number;
}

const months = [
  "Feb",
  "Jan",
  "Dec",
  "Nov",
  "Oct",
  "Sep",
  "Aug",
  "Jul",
  "Jun",
  "May",
  "Apr",
  "Mar",
];

const monthDays: { [key: string]: number } = {
  Jan: 31,
  Feb: 28,
  Mar: 31,
  Apr: 30,
  May: 31,
  Jun: 30,
  Jul: 31,
  Aug: 31,
  Sep: 30,
  Oct: 31,
  Nov: 30,
  Dec: 31,
};

const currentYear = new Date().getFullYear();
if (
  currentYear % 4 === 0 &&
  (currentYear % 100 !== 0 || currentYear % 400 === 0)
) {
  monthDays["Feb"] = 29;
}

const data: DataPoint[] = [];
Object.entries(monthDays).forEach(([month, days]) => {
  for (let day = 1; day <= days; day++) {
    data.push({
      name: `${month} ${day}`,
      month,
      uv: Math.floor(Math.random() * 1000) + 200,
      pv: Math.floor(Math.random() * 3000) + 2000,
      amt: Math.floor(Math.random() * 500) + 2000,
    });
  }
});
export default function LineChartData() {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  const filteredData = data.filter((item) => item.month === selectedMonth);

  return (
    <div className="w-full rounded-lg border bg-white border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center p-2 px-4 border-b h-12 border-b-gray-200">
        <p className="text-base md:text-lg font-medium">Recent Order</p>
        <select
          className="px-1 rounded-sm border-gray-400 border"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex p-2 pl-4">
        <div className="flex flex-col gap-2">
          <div>
            <h5 className="text-sm">Active</h5>
            <p className="text-base font-bold">300</p>
          </div>
          <div>
            <h5 className="text-sm">Pending</h5>
            <p className="text-base font-bold">100</p>
          </div>
          <div>
            <h5 className="text-sm">Accepted</h5>
            <p className="text-base font-bold">400</p>
          </div>
        </div>
        <div className="size-full">
          <ResponsiveContainer width={"100%"} height={250}>
            <AreaChart data={filteredData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="grey"
                fillOpacity={0.3}
              />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
