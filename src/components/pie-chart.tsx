import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const pie_data = [
  {
    name: "Loaded",
    value: Math.floor(Math.random() * 80) + 10,
    color: "#8884d8",
  },
  {
    name: "In Transit",
    value: Math.floor(Math.random() * 60) + 10,
    color: "#82ca9d",
  },
  {
    name: "Idle",
    value: Math.floor(Math.random() * 40) + 10,
    color: "#ffc658",
  },
  {
    name: "Delayed",
    value: Math.floor(Math.random() * 20) + 5,
    color: "#ff8042",
  },
];

const totalValue = pie_data.reduce((acc, curr) => acc + curr.value, 0);

export default function TruckLoadingPieChart() {
  return (
    <div className="w-full rounded-lg border bg-white border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center p-2 px-4 border-b h-12 border-b-gray-200">
        <p className="text-base md:text-lg font-medium">Loading Trucks</p>
        <p className="text-blue-500 hover:underline cursor-pointer">View all</p>
      </div>
      <div className="w-full flex flex-col xl:flex-row p-2 pl-4">
        <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4 justify-center xl:w-[40%]">
          {pie_data.map((item, i) => (
            <p
              key={i}
              className="flex items-center gap-1 md:gap-2 text-base font-normal text-slate-600"
            >
              <span
                className="size-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
              <span className="font-bold text-black">{item.value}</span>
            </p>
          ))}
        </div>

        <div className="size-full -m-4">
          <ResponsiveContainer width={"100%"} height={250}>
            <PieChart>
              <Pie
                data={pie_data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {pie_data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label
                  value={`Total: ${totalValue}`}
                  position="center"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fill: "#333",
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
