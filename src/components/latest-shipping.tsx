import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Search from "./search";

const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
  return futureDate
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
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

const shippingData = Array.from({ length: 10 }, (_) => {
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
  const [searchParams] = useSearchParams();

  const [shippings, setShippings] = useState(shippingData);

  useEffect(() => {
    const query = searchParams.get("shipping")?.toLowerCase() || "";

    const filteredShippings = shippingData.filter((order) => {
      return (
        order.status.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.departure.toLowerCase().includes(query) ||
        order.arrival.toLowerCase().includes(query) ||
        order.orderId.toLowerCase().includes(query)
      );
    });

    setShippings(filteredShippings);
  }, [searchParams]);

  return (
    <div className="w-full rounded-lg border bg-white border-gray-200 shadow-sm">
      <div className="w-full flex flex-wrap gap-2 justify-between items-center p-2 px-4 border-b lg:h-12 border-b-gray-200">
        <p className="text-base md:text-lg font-medium">Latest Shipping</p>
        <Search
          query_name="shipping"
          placeholder="Search customer, order id, status etc."
          className="min-w-64 outline-none border border-gray-300 rounded-full h-8 px-4 py-2 bg-transparent placeholder:text-gray-300 text-black text-base"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Order ID
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Status
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Customer
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Weight
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Departure
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Arrival
              </th>
              <th className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                Arrival Date
              </th>
            </tr>
          </thead>
          <tbody>
            {shippings.map((shipment, index) => (
              <tr key={index} className="text-center">
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                  {shipment.orderId}
                </td>
                <td
                  className={`border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2 font-medium ${
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
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                  {shipment.customer}
                </td>
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                  {shipment.weight}
                </td>
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                  {shipment.departure}
                </td>
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
                  {shipment.arrival}
                </td>
                <td className="border-y border-gray-200 text-sm md:text-base px-2 md:px-4 py-2">
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
