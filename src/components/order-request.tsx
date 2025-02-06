import { useEffect, useState } from "react";
import Search from "./search";
import { useSearchParams } from "react-router";

const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomDateTime = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString().replace("T", " ").split(".")[0];
};

const cities = [
  "Lagos",
  "New York",
  "Shanghai",
  "Dubai",
  "London",
  "Tokyo",
  "Paris",
];

const companies = [
  { name: "Swift Logistics", type: "Logistics", location: "Lagos, Nigeria" },
  {
    name: "Global Freight",
    type: "Freight Forwarding",
    location: "New York, USA",
  },
  { name: "Metro Movers", type: "Moving Services", location: "London, UK" },
  { name: "Cargo Express", type: "Courier", location: "Dubai, UAE" },
];

const items = [
  "Electronics & Gadgets",
  "Furniture & Home Appliances",
  "Medical Equipment",
  "Industrial Machinery",
  "Clothing & Apparel",
  "Food & Perishables",
];

const orderRequests = Array.from({ length: 10 }, (_) => {
  const departure = getRandomItem(cities);
  let arrival = getRandomItem(cities);
  while (arrival === departure) arrival = getRandomItem(cities);

  const company = companies[Math.floor(Math.random() * companies.length)];

  return {
    orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    dateTime: getRandomDateTime(),
    orderSummary: getRandomItem(items),
    pickupAddress: `${Math.floor(
      Math.random() * 100
    )} ${departure} Street, ${departure}`,
    deliveryAddress: `${Math.floor(
      Math.random() * 100
    )} ${arrival} Road, ${arrival}`,
    departure,
    arrival,
    company,
  };
});

export default function OrderRequest() {
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof orderRequests)[0] | null
  >(null);

  const [searchParams] = useSearchParams();

  const [orders, setOrders] = useState(orderRequests);

  useEffect(() => {
    const query = searchParams.get("order_request")?.toLowerCase() || "";

    const filteredOrders = orderRequests.filter((order) => {
      return (
        order.company.name.toLowerCase().includes(query) ||
        order.departure.toLowerCase().includes(query) ||
        order.arrival.toLowerCase().includes(query)
      );
    });

    setOrders(filteredOrders);
  }, [searchParams]);

  return (
    <>
      {selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            <p className="mb-2">
              <span className="font-medium">Order ID:</span>{" "}
              {selectedOrder.orderId}
            </p>
            <p className="mb-2">
              <span className="font-medium">Date & Time:</span>{" "}
              {selectedOrder.dateTime}
            </p>
            <p className="mb-2">
              <span className="font-medium">Order Summary:</span>{" "}
              {selectedOrder.orderSummary}
            </p>
            <p className="mb-2">
              <span className="font-medium">Pickup Address:</span>{" "}
              {selectedOrder.pickupAddress}
            </p>
            <p className="mb-2">
              <span className="font-medium">Delivery Address:</span>{" "}
              {selectedOrder.deliveryAddress}
            </p>
            <p className="mb-2">
              <span className="font-medium">Departure:</span>{" "}
              {selectedOrder.departure}
            </p>
            <p className="mb-2">
              <span className="font-medium">Arrival:</span>{" "}
              {selectedOrder.arrival}
            </p>
            <p className="mb-2">
              <span className="font-medium">Company:</span>{" "}
              {selectedOrder.company.name}
            </p>
            <p className="mb-2">
              <span className="font-medium">Company Type:</span>{" "}
              {selectedOrder.company.type}
            </p>
            <p className="mb-2">
              <span className="font-medium">Company Location:</span>{" "}
              {selectedOrder.company.location}
            </p>
            <div className="flex items-center gap-4 justify-center w-full my-4">
              <button className="px-6 py-2 bg-blue-500 hover:bg-blue-500/90 text-white transition rounded-md cursor-pointer">
                Accept
              </button>
              <button className="px-6 py-2 text-blue-500 border border-blue-500 hover:opacity-90 transition rounded-md cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full rounded-lg border bg-white border-gray-200 shadow-sm min-h-screen">
        <div className="w-full flex justify-between items-center gap-4 p-2 px-4 border-b h-12 border-b-gray-200">
          <p className="text-base md:text-lg font-medium">Order Requests</p>

          <Search
            query_name={"order_request"}
            placeholder="Search date, order id etc."
            className="w-full outline-none border border-gray-300 rounded-full h-8 px-4 py-2 bg-transparent placeholder:text-gray-300 text-black text-base"
          />
        </div>
        <div className="flex flex-col gap-4 p-4 pt-2 h-screen hide-scrollbar overflow-y-auto">
          {orders.map((request, i) => (
            <div
              key={i}
              className="w-full flex flex-col bg-[#fff1f0] rounded-lg px-2"
            >
              <div className="w-full flex items-center justify-between gap-4 py-2">
                <h4 className="font-medium">{request.orderId}</h4>
                <p className="text-sm text-slate-500">{request.dateTime}</p>
              </div>
              <span className="h-0.5 border border-dashed border-gray-200 w-full rounded-full" />
              <div className="flex items-center justify-between gap-2 py-2">
                <div className="w-auto">
                  <p className="text-xs text-gray-600">Pickup location</p>
                  <h5 className="font-semibold">{request.departure}</h5>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Destination</p>
                  <h5 className="font-semibold">{request.arrival}</h5>
                </div>
              </div>
              <span className="h-0.5 border border-dashed border-gray-200 w-full rounded-full" />
              <div className="w-full flex items-center justify-between gap-4 py-2">
                <h4 className="font-semibold text-black">
                  {request.company.name}
                </h4>
                <p
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedOrder(request)}
                >
                  View Details
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
