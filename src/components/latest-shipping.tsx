const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  return futureDate.toISOString().split("T")[0];
};

const statuses = ["Shipped", "In Transit", "Delivered", "Pending", "Cancelled"];
const cities = [
  "Lagos",
  "New York",
  "Shanghai",
  "Dubai",
  "London",
  "Tokyo",
  "Paris",
];
const customers = [
  "John Doe",
  "Alice Smith",
  "Bob Johnson",
  "Emma Brown",
  "Michael Lee",
];

const shippingData = Array.from({ length: 10 }, (_, i) => {
  const departure = getRandomItem(cities);
  let arrival = getRandomItem(cities);
  while (arrival === departure) arrival = getRandomItem(cities);

  return {
    orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    status: getRandomItem(statuses),
    customer: getRandomItem(customers),
    weight: (Math.random() * 100 + 10).toFixed(2) + " kg",
    departure,
    arrival,
    arrivalDate: getRandomDate(),
  };
});

export default function LatestShipping() {
  return (
    <div className="w-full rounded-lg border bg-white border-gray-200 shadow-sm">
      <div className="w-full flex justify-between items-center p-2 px-4 border-b h-12 border-b-gray-200">
        <p className="text-base md:text-lg font-medium">Latest Shipping</p>
        <p className="text-blue-500 hover:underline cursor-pointer">View all</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-y border-gray-200 px-4 py-2">Order ID</th>
              <th className="border-y border-gray-200 px-4 py-2">Status</th>
              <th className="border-y border-gray-200 px-4 py-2">Customer</th>
              <th className="border-y border-gray-200 px-4 py-2">Weight</th>
              <th className="border-y border-gray-200 px-4 py-2">Departure</th>
              <th className="border-y border-gray-200 px-4 py-2">Arrival</th>
              <th className="border-y border-gray-200 px-4 py-2">
                Arrival Date
              </th>
            </tr>
          </thead>
          <tbody>
            {shippingData.map((shipment, index) => (
              <tr key={index} className="text-center">
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.orderId}
                </td>
                <td
                  className={`border-y border-gray-200 px-4 py-2 font-medium ${
                    shipment.status === "Delivered"
                      ? "text-green-600"
                      : shipment.status === "In Transit"
                      ? "text-blue-600"
                      : shipment.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {shipment.status}
                </td>
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.customer}
                </td>
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.weight}
                </td>
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.departure}
                </td>
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.arrival}
                </td>
                <td className="border-y border-gray-200 px-4 py-2">
                  {shipment.arrivalDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
